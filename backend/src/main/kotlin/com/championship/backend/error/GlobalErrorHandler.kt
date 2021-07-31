package com.championship.backend.error

import com.championship.backend.controllers.ChampionshipService
import org.apache.logging.log4j.Level
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

class ApiValidationException(message: String): Exception(message)
data class ErrorResponse(val message: String)

@ControllerAdvice
class GlobalErrorHandler {

    val logger: Logger = LogManager.getLogger(ChampionshipService::class.java)

    @ExceptionHandler(value = [ApiValidationException::class])
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleApiValidationException(ex: ApiValidationException): ErrorResponse {
        logger.log(Level.ERROR, ex)
        return ErrorResponse(ex.message ?: "Unknown Error")
    }

}
