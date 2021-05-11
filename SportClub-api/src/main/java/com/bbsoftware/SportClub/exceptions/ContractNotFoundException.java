package com.bbsoftware.SportClub.exceptions;

public class ContractNotFoundException extends RuntimeException{
    public ContractNotFoundException(Long id) {
        super("Could not find contract " + id);
    }
}
