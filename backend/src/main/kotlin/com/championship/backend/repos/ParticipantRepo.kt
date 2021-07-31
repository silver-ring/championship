package com.championship.backend.repos

import com.championship.backend.models.Participant
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
interface ParticipantRepo : CrudRepository<Participant, Int> {
    fun findAllByDeletedIsFalse(): List<Participant>
}
