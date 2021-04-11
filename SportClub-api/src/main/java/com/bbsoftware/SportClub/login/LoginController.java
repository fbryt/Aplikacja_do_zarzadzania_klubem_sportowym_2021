package com.bbsoftware.SportClub.login;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbsoftware.SportClub.models.Employee;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@AllArgsConstructor
public class LoginController {

    private final LoginService loginservice;

    @PostMapping
    public String login(@RequestBody LoginRequest request) {
        return loginservice.login(request);
    }
}
