package com.bbsoftware.SportClub.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "resource not found")
public class ContractNotFoundException extends RuntimeException {
    public ContractNotFoundException(Long id) {
        super("Could not find contract " + id);
    }
}
