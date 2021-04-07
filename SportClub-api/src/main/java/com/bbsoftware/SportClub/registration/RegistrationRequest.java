package com.bbsoftware.SportClub.registration;

import com.bbsoftware.SportClub.appuser.AppUserRole;
import lombok.*;

@Getter
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private  String firstName;
    private  String lastName;
    private  String email;
    private  String password;
    private  AppUserRole role;

    public RegistrationRequest() {
    }

    public RegistrationRequest(String firstName, String lastName, String email, String password, AppUserRole role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
