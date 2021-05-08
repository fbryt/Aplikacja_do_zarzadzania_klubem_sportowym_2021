package com.bbsoftware.SportClub.resetpassword;

import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
public class ResetPasswordRequest {
    private String email;

    public ResetPasswordRequest() {

    }

    public ResetPasswordRequest(String email) {
        this.email = email;
    }
}
