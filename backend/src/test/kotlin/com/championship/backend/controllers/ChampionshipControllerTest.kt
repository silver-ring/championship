package com.championship.backend.controllers

import com.championship.backend.error.ErrorResponse
import com.championship.backend.models.Participant
import com.championship.backend.repos.MatchRepo
import com.championship.backend.repos.ParticipantRepo
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@SpringBootTest
@AutoConfigureMockMvc
internal class ChampionshipControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var participantRepo: ParticipantRepo

    @Autowired
    private lateinit var matchRepo: MatchRepo

    val participants = mutableListOf(
        Participant(name = "Participant1", deleted = false),
        Participant(name = "Participant2", deleted = false),
        Participant(name = "Participant3", deleted = false),
        Participant(name = "Participant4", deleted = false)
    )

    @BeforeEach
    fun beforeAll() {
        participantRepo.deleteAll()
        participantRepo.saveAll(participants)
    }

    @Test
    fun startChampionship_validateNumberOfParticipants() {
        val participantToDelete = participantRepo.findAll().toList()[0]
        participantRepo.delete(participantToDelete)
        val participantsCount = participantRepo.count()
        val response = this.mockMvc.perform(
            post("/championship/start")
                .content(ObjectMapper().writeValueAsString(StartChampionshipRequest(participantsCount.toInt())))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn().response
        val status = response.status
        val content = jacksonObjectMapper().readValue<ErrorResponse>(response.contentAsString)
        val matchesCount = matchRepo.count()
        assertEquals(400, status)
        assertEquals("Number Of Participants Must Be Even", content.message)
        assertEquals(0, matchesCount)
    }

    @Test
    fun startChampionship_validateMinNumberOfGroups() {
        val response = this.mockMvc.perform(
            post("/championship/start")
                .content(ObjectMapper().writeValueAsString(StartChampionshipRequest(0)))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn().response
        val status = response.status
        val content = jacksonObjectMapper().readValue<ErrorResponse>(response.contentAsString)
        val matchesCount = matchRepo.count()
        assertEquals(400, status)
        assertEquals("Group Should Be At Least 1", content.message)
        assertEquals(0, matchesCount)
    }

    @Test
    fun startChampionship_validateMaxNumberOfGroups() {
        val response = this.mockMvc.perform(
            post("/championship/start")
                .content(ObjectMapper().writeValueAsString(StartChampionshipRequest(participants.size)))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn().response
        val status = response.status
        val content = jacksonObjectMapper().readValue<ErrorResponse>(response.contentAsString)
        val matchesCount = matchRepo.count()
        assertEquals(400, status)
        assertEquals("Group Can't Be More Than Half Of The Number Of Participants", content.message)
        assertEquals(0, matchesCount)
    }

    @Test
    fun startChampionship_success() {
        val numberOfGroups = participants.size / 2
        val response = this.mockMvc.perform(
            post("/championship/start")
                .content(ObjectMapper().writeValueAsString(StartChampionshipRequest(numberOfGroups)))
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andReturn().response
        val status = response.status
        val matches = matchRepo.findAll().toList()
        assertEquals(200, status)
        assertEquals("", response.contentAsString)
        assertEquals(2, matches.size)

        // validate each group have matches
        val groups = matches.groupBy { it.group }
        assertEquals(2, groups.size)
        assertEquals(1, groups[1]?.size)
        assertEquals(1, groups[2]?.size)

        // validate all participants have matches
        val matchParticipants = matches.fold(mutableSetOf<Participant>()) {matchParticipants, match ->
            match.participant1?.let {
                matchParticipants.add(it)
            }
            match.participant2?.let {
                matchParticipants.add(it)
            }
            matchParticipants
        }

        participants.forEach {
            assertTrue(matchParticipants.contains(it))
        }

    }

}
