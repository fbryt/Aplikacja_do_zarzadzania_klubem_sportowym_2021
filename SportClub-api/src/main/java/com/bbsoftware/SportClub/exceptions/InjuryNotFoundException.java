package com.bbsoftware.SportClub.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "resource not found")

public class InjuryNotFoundException extends RuntimeException{
    public InjuryNotFoundException(Long id){super("Could not find injury for " + id);}
}
