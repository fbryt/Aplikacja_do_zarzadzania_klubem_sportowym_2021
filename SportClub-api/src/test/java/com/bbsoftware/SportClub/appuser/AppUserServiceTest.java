package com.bbsoftware.SportClub.appuser;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

   /* @Test
    @Disabled
    void testsignUpUser(){

        AppUser user = new AppUser("xyz","yzx","example12@example.com","password",AppUserRole.PLAYER);
        when(repository.save(user)).thenCallRealMethod();
        when(repository.findByEmail("example12@example.com")).thenCallRealMethod();
        service.signUpUser(user);
        UserDetails details = service.loadUserByUsername("example12@example.com");
        assertEquals("example12@example.com",details.getUsername());
    }*/

}