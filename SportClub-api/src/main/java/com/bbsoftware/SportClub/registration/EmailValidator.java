package com.bbsoftware.SportClub.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;


@Service
public class EmailValidator implements Predicate<String> {

    String regex="^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    Pattern pattern = Pattern.compile(regex);
    @Override
    public boolean test(String s) {
       //todo email validation
        return pattern.matcher(s).matches();
    }
}
