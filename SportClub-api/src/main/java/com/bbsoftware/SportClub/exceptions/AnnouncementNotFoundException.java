package com.bbsoftware.SportClub.exceptions;

public class AnnouncementNotFoundException extends RuntimeException{
    public AnnouncementNotFoundException(Long id) {
        super("Could not find announcement " + id);
    }
}
