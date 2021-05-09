package com.bbsoftware.SportClub.controllers;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserModelAssembler;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.appuser.AppUserService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.ReflectionUtils;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.security.InvalidParameterException;
import java.util.Map;

@JsonAutoDetect
class Params{
    String oldpassword;
    String password;

    public String getOldpassword() {
        return oldpassword;
    }
    public String getPassword(){
        return password;
    }
}



@RestController
@AllArgsConstructor
public class SettingsController {

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AppUserRepository appUserRepository;
    @Autowired
    AppUserService appUserService;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    private final AppUserModelAssembler appUserModelAssembler;


    @PostMapping("/settings/password")
    public EntityModel<AppUser> changePassword(@RequestBody Params passwords){

        String oldpassword = passwords.getOldpassword();
        String password = passwords.getPassword();
        AppUser user = appUserService.loadUserByUsername(SecurityContextHolder.getContext().
                getAuthentication().getName());
        if( !passwordEncoder.matches(oldpassword,user.getPassword())){
            throw new InvalidParameterException();
        }
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encodedPassword);
        appUserRepository.save(user);

        return appUserModelAssembler.toModel(user);

    }
}
