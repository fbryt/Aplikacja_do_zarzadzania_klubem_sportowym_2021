package com.bbsoftware.SportClub.security;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private final Long id;

    public AuthenticationResponse(String jwt, Long id) {
        this.jwt = jwt;
        this.id = id;
    }

    public String getJwt() {
        return jwt;
    }
    public Long getId() {
        return id;
    }
}