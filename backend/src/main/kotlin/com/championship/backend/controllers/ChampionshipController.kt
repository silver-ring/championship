package com.championship.backend.controllers

import com.championship.backend.error.ApiValidationException
import com.championship.backend.models.Participant
import com.championship.backend.repos.MatchRepo
import com.championship.backend.repos.ParticipantRepo
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

data class StartChampionshipRequest(val numberOfGroups: Int)

@RestController
@RequestMapping("/championship")
class ChampionshipController(val championshipService: ChampionshipService) {

    @PostMapping("/start")
    fun startChampionship(@RequestBody startChampionshipRequest: StartChampionshipRequest) {
        val participants = championshipService.findActiveParticipants()
        if (participants.size % 2 != 0) {
            throw ApiValidationException("Number Of Participants Must Be Even")
        }
        if (startChampionshipRequest.numberOfGroups < 1) {
            throw ApiValidationException("Group Should Be At Least 1")
        }
        if (startChampionshipRequest.numberOfGroups > (participants.size / 2)) {
            throw ApiValidationException("Group Can't Be More Than Half Of The Number Of Participants")
        }
        val existingMatches = championshipService.findAndCloseMatches()
        val numberOfGroups = startChampionshipRequest.numberOfGroups
        val allMatches = championshipService.generateListOfMatches(participants, numberOfGroups)
        championshipService.saveMatches(allMatches + existingMatches)
    }

    @PostMapping("/close")
    @ResponseBody
    fun closeRound(): Participant? {
        val winners = mutableListOf<Participant>()
        val closedMatches = championshipService.closeRoundMatches(winners)

        if (winners.size == 1) {
            championshipService.saveMatches(closedMatches)
            return winners[0]
        }

        val numberOfGroups = if (winners.size > 2) {
            winners.size / 2
        } else {
            1
        }
        val newMatches = championshipService.generateListOfMatches(winners, numberOfGroups)
        championshipService.saveMatches(closedMatches + newMatches)
        return null
    }

}
