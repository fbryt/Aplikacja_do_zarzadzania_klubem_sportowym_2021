package com.bbsoftware.SportClub.login;

import com.bbsoftware.SportClub.appuser.AppUserRole;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
public class LoginRequest {

    private String email;
    private String password;


    public LoginRequest( String email, String password) {

        this.email = email;
        this.password = password;

    }
}