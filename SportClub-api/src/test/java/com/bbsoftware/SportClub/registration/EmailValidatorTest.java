package com.bbsoftware.SportClub.registration;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
@TestInstance(Lifecycle.PER_CLASS)
@DisplayName("Email Validator Tests")
public class EmailValidatorTest{

    static final Logger logger = Logger.getLogger(EmailValidatorTest.class.getName());
    private EmailValidator validator;
    @BeforeAll
    void init(){
        validator = new EmailValidator();
    }
    @BeforeEach
    void beforeEach(TestInfo testInfo){
        logger.info(()->String.format("Executing [%s]",testInfo.getDisplayName()));
    }
    @Test
    @DisplayName("test containing valid email written only in lowercase")
    void test_correct_email(){
            assertTrue(validator.test("email@example.com"));
    }
    @Test
    @DisplayName("test containing valid email written with digits")
    void test_correct_email2(){
        assertTrue(validator.test("1234567890@example.com"));
    }
    @Test
    @DisplayName("test containing valid email with special characters")
    void test_correct_email3(){
        assertTrue(validator.test("_______@example.com"));
    }
    @Test
    @DisplayName("test containing valid email with diffrent domain")
    void test_correct_email4(){
        assertTrue(validator.test("email@example.co.jp"));
    }
    @Test
    @DisplayName("test containing invalid email with multiple '@' characters")
    void test_invalid_email(){
        assertFalse(validator.test("A@b@c@example.com"));
    }
}