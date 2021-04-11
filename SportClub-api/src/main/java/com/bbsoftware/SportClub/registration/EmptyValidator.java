package com.bbsoftware.SportClub.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmptyValidator implements Predicate<String> {

    String empty="";
    @Override
    public boolean test(String s) {
        return !s.equals(empty);
    }
}
