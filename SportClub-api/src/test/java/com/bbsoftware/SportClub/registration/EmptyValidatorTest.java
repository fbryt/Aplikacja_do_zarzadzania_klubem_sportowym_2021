package com.bbsoftware.SportClub.registration;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
@TestInstance(Lifecycle.PER_CLASS)
public class EmptyValidatorTest{

    private EmptyValidator validator;

    @BeforeAll
    void init(){
        validator = new EmptyValidator();
    }
    @Test
    void testEmptyValidator_Empty(){
        assertFalse(validator.test(""));
    }

    @Test
    void testEmptyValidator_Nonempty(){
        assertTrue(validator.test(" "));
    }
}