package com.bbsoftware.SportClub.exceptions;

public class AppUserEmailNotFoundException extends Throwable {
    public AppUserEmailNotFoundException(String email) {
        super("Could not find app user " + email);
    }
}
