package com.bbsoftware.SportClub.registration;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final EmptyValidator emptyValidator;
    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail)
        {
            throw new IllegalStateException("Email is not valid");
        }
        if(!emptyValidator.test(request.getFirstName())||
                !emptyValidator.test(request.getLastName())||
                !emptyValidator.test(request.getPassword())||
                !emptyValidator.test(request.getRole().toString()))
        {
            throw new IllegalStateException("Any form field is empty");
        }


        return appUserService.signUpUser(new AppUser(request.getFirstName(),request.getLastName(),request.getEmail(),request.getPassword(), request.getRole()));
    }
}
