package com.bbsoftware.SportClub.login;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.appuser.AppUserService;
import com.bbsoftware.SportClub.registration.EmailValidator;
import com.bbsoftware.SportClub.registration.EmptyValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final EmptyValidator emptyValidator;
    public String login(LoginRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail)
        {
            throw new IllegalStateException("Email is not valid");
        }
        if(!emptyValidator.test(request.getPassword()))
        {
            throw new IllegalStateException("Any form field is empty");
        }


        return appUserService.signInUser(request.getEmail(),request.getPassword());
    }
}