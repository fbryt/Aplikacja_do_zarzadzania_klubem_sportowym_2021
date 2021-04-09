package com.bbsoftware.SportClub.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class MainController {


    @GetMapping("/")
    public String hello() {
        return "Witajcie sportowe swiry";
    }
}
