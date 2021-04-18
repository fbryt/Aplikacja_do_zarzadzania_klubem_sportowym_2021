package com.bbsoftware.SportClub.appuser;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class AppUserServiceTest{
    @InjectMocks
    private AppUserService service;


    private static AppUserRepository repository;
    @BeforeAll
    void init(){
        repository = mock(AppUserRepository.class,CALLS_REAL_METHODS);
    }
    @Test
    void testloadUserByUsername(){
        AppUser user = new AppUser("xyz","zyx","example@example.com","password",AppUserRole.PLAYER);
        when(repository.findByEmail("example@example.com")).thenReturn(Optional.of(user));
        UserDetails details = service.loadUserByUsername("example@example.com");
        assertEquals(details.getUsername(),"example@example.com");
    }

    @Test
    void testsignUpUser(){

        AppUser user = new AppUser("xyz","yzx","example12@example.com","password",AppUserRole.PLAYER);
        when(repository.findByEmail("example12@example.com")).thenReturn(Optional.of(user));
        Exception exception = assertThrows(IllegalStateException.class,() ->{service.signUpUser(user);});
        String expectedMsg = "Email already taken";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

    /*@Test
    void testSignInUser(){

        AppUser user = new AppUser("xyz","zyx","email","password",AppUserRole.PLAYER);

        when(repository.findByEmail("email")).thenReturn(Optional.of(user));
        String expectedValue = "email";
        String actualValue = service.signInUser("email","password");
        assertTrue(actualValue.contains(expectedValue));
    }*/

}