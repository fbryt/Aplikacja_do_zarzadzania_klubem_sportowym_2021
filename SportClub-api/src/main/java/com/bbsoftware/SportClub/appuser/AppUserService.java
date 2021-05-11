package com.bbsoftware.SportClub.appuser;

import com.bbsoftware.SportClub.exceptions.AppUserEmailNotFoundException;
import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND = "User with email %s not found";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public AppUser loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

    public String signUpUser(AppUser appUser) {
        boolean present = appUserRepository.findByEmail(appUser.getEmail()).isPresent();

        if (present) {
            throw new IllegalStateException("Email already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        return "";
    }

    public String signInUser(String email, String password) {

        boolean present = appUserRepository.findByEmail(email).isPresent();

        if (present) {

            AppUser usr = appUserRepository.findByEmail(email).get();

            String encodedPassword = bCryptPasswordEncoder.encode(password);

            if (encodedPassword == usr.getPassword()) {

                return email;
            }
            return "";
        }
        return "";

    }
    public void updateResetToken(String token, String email) throws AppUserEmailNotFoundException {

        boolean present = appUserRepository.findByEmail(email).isPresent();
        if(present)
        {
            AppUser user = appUserRepository.findByEmail(email).get();
            user.setResetToken(token);
            appUserRepository.save(user);
        }
        else
        {
            throw new AppUserEmailNotFoundException(email);
        }
    }

    public void setCoachId(Long coachid,  Long id ){


        AppUser coach =  appUserRepository.findById(coachid) //
                .orElseThrow(() -> new AppUserNotFoundException(coachid));

        AppUser player =  appUserRepository.findById(id) //
                .orElseThrow(() -> new AppUserNotFoundException(id));

        player.setCoach(coach);
        coach.setPlayers(player);
        //player.setCoachId(coachid.intValue());
        appUserRepository.save(player);
        appUserRepository.save(coach);


    }
    public AppUser get(String resetToken)
    {
        return appUserRepository.findByResetToken(resetToken);
    }

}
