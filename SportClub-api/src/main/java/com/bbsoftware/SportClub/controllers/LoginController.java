package com.bbsoftware.SportClub.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbsoftware.SportClub.models.Employee;


@RestController
public class LoginController {


    @GetMapping("/login")
    public String hello() {
        return "Zalogowano";
    }
}