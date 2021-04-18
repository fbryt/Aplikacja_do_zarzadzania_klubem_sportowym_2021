package com.bbsoftware.SportClub.appuser;

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
}
