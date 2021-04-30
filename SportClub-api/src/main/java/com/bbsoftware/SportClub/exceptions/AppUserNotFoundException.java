package com.bbsoftware.SportClub.exceptions;

public class AppUserNotFoundException extends RuntimeException {

  public AppUserNotFoundException(Long id) {
    super("Could not find app user " + id);
  }

}