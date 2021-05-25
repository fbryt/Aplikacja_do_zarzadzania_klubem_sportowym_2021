package com.bbsoftware.SportClub.exceptions;

public class UserHasInjuryException extends RuntimeException{
    public UserHasInjuryException(Long id){super(String.format("User %d is already injured!",id));}
}
