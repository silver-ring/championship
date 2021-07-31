package com.championship.backend.repos

import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry
import javax.persistence.EntityManager

@Configuration
class RepoConfig(private val entityManager: EntityManager) : RepositoryRestConfigurer {

    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration, cors: CorsRegistry) {
        val types = entityManager.metamodel.entities.map { entity ->
            entity.javaType
        }.toTypedArray()
        config.exposeIdsFor(*types)
        cors.addMapping("/**").allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
    }

}

