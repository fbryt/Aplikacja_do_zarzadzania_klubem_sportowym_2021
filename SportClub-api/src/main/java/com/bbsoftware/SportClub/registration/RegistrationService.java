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

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if(!isValidEmail)
        {
            throw new IllegalStateException("Email is not valid");
        }

        return appUserService.signUpUser(new AppUser(request.getFirstName(),request.getLastName(),request.getEmail(),request.getPassword(), AppUserRole.USER));
    }
}
