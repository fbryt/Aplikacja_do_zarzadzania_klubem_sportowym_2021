package com.bbsoftware.SportClub.resetpassword;

import com.bbsoftware.SportClub.appuser.AppUserService;
import com.bbsoftware.SportClub.exceptions.AppUserEmailNotFoundException;
import com.bbsoftware.SportClub.security.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import net.bytebuddy.utility.RandomString;

import java.util.Map;

@RestController
@AllArgsConstructor
public class ResetPasswordController {
    @Autowired
    private AppUserService appUserService;
    @RequestMapping(
            value = "/forgotpassword",
            method = RequestMethod.POST)
    public ResponseEntity processForgotPasswordForm(@RequestBody ResetPasswordRequest request)
    {
        String token = RandomString.make(128);
        try {
            appUserService.updateResetToken(token, request.getEmail());
        }
        catch(AppUserEmailNotFoundException e)
        {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("success");
    }
}