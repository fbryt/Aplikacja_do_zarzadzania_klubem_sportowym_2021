package com.bbsoftware.SportClub.resetpassword;

import com.bbsoftware.SportClub.appuser.AppUserService;
import com.bbsoftware.SportClub.email.EmailService;
import com.bbsoftware.SportClub.exceptions.AppUserEmailNotFoundException;
import com.bbsoftware.SportClub.security.AuthenticationResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import net.bytebuddy.utility.RandomString;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
@AllArgsConstructor
public class ResetPasswordController {
    @Autowired
    private AppUserService appUserService;
    private EmailService emailService;
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
        File input = new File("src/main/resources/templates/mail.html");
        Document doc;
        if(input.exists()) {
            try {
                doc = Jsoup.parse(input, null);
                doc.select("a.reset").attr("href", "localhost:3000/resetpassword/" + token);
                String mail;
                mail = doc.toString();
                emailService.send(request.getEmail(), mail, "Reset password");
                return ResponseEntity.ok("success");
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
        }
//        String mail= "<h1>Hi!</h1></br>Here is your reset password link: </br><a href=\"";
//        mail = mail+ "localhost:3000/resetpassword/" + token + "\""+">RESET PASSWORD"+"</a></br><h4>B&B Software</h4>";
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}