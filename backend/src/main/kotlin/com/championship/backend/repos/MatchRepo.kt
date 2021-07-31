package com.championship.backend.repos

import com.championship.backend.models.Match
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
interface MatchRepo: CrudRepository<Match, Int> {
    fun findAllByRoundClosedIsFalse(): List<Match>
    fun countAllByRoundClosedIsFalse(): Long
}
