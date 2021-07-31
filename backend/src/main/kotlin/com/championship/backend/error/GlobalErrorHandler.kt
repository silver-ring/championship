package com.championship.backend.error

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

class ApiValidationException(message: String): Exception(message)
data class ErrorResponse(val message: String)

@ControllerAdvice
class GlobalErrorHandler {

    @ExceptionHandler(value = [ApiValidationException::class])
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleApiValidationException(ex: ApiValidationException): ErrorResponse {
        return ErrorResponse(ex.message ?: "Unknown Error")
    }

}
