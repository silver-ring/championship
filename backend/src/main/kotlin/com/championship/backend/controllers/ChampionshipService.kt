package com.championship.backend.controllers

import com.championship.backend.error.ApiValidationException
import com.championship.backend.models.Match
import com.championship.backend.models.Participant
import com.championship.backend.repos.MatchRepo
import com.championship.backend.repos.ParticipantRepo
import org.springframework.stereotype.Service

@Service
class ChampionshipService(val matchRepo: MatchRepo, val participantRepo: ParticipantRepo) {

    fun closeRoundMatches(winners: MutableList<Participant>) =
        matchRepo.findAllByRoundClosedIsFalse().groupBy { match ->
            match.group
        }.map {(group, matches) ->
            val points = mutableMapOf<Participant, Int>()
            val closedMatches = matches.map { match ->
                closeMatch(match, points)
                match
            }
            val participantsPoints = points.toList().sortedBy { it.second }
            if (participantsPoints. size > 1 && participantsPoints[0].second == participantsPoints[1].second) {
                throw ApiValidationException("Can't Close the Round Because Group $group Have Many Winners")
            }
            val winner = participantsPoints[0].first
            winners.add(winner)
            closedMatches
        }.flatten()

    fun generateListOfMatches(participants: List<Participant>, numberOfGroups: Int): List<Match> {
        val numberOfTeamsOnGroup = participants.size / numberOfGroups
        val groups = participants.shuffled().chunked(numberOfTeamsOnGroup)
        var currentGroupNumber = 1
        return groups.map { group ->
            val matches = mutableListOf<Match>()
            generateGroupMatches(currentGroupNumber, group.toMutableList(), matches)
            currentGroupNumber++
            matches
        }.flatten()
    }

    fun generateGroupMatches(
        currentGroupNumber: Int,
        group: MutableList<Participant>, matches: MutableList<Match>
    ) {
        if (group.size == 0) {
            return
        }
        val currParticipant = group.removeFirst()
        group.forEach {
            val match = Match()
            match.participant1 = currParticipant
            match.participant2 = it
            match.group = currentGroupNumber
            match.participant1Score = 0
            match.participant2Score = 0
            match.roundClosed = false
            matches.add(match)
        }
        generateGroupMatches(currentGroupNumber, group, matches)
    }

    fun saveMatches(matches: List<Match>) {
        matchRepo.saveAll(matches)
    }

    fun findActiveParticipants() = participantRepo.findAllByDeletedIsFalse().toList()

    fun findAndCloseMatches(): List<Match> =
        matchRepo.findAllByRoundClosedIsFalse().map {
            it.roundClosed = true
            it
        }

    private fun closeMatch(
        match: Match,
        points: MutableMap<Participant, Int>
    ) {
        match.roundClosed = true
        val participant1TotalScore = points.getOrDefault(match.participant1, 0)
        val participant2TotalScore = points.getOrDefault(match.participant2, 0)
        when {
            (match.participant1Score ?: 0) > (match.participant2Score ?: 0) -> {
                match.participant1?.let { participant ->
                    points.put(participant, participant1TotalScore + 3)
                }
            }
            (match.participant1Score ?: 0) < (match.participant2Score ?: 0) -> {
                match.participant2?.let { participant ->
                    points.put(participant, participant2TotalScore + 3)
                }
            }
            else -> {
                match.participant1?.let { participant ->
                    points.put(participant, participant1TotalScore + 1)
                }
                match.participant2?.let { participant ->
                    points.put(participant, participant2TotalScore + 1)
                }
            }
        }
    }

}
