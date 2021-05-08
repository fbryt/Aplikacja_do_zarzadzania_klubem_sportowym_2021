package com.bbsoftware.SportClub.resetpassword;

import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
public class ResetPasswordNewRequest {
    private String password;

    public ResetPasswordNewRequest() {

    }

    public ResetPasswordNewRequest(String password) {
        this.password = password;
    }
}
