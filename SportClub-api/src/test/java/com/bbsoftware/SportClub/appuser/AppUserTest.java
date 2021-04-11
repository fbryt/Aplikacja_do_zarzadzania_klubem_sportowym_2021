package com.bbsoftware.SportClub.appuser;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


@TestInstance(Lifecycle.PER_CLASS)


public class AppUserTest{

    private AppUser user;
    @BeforeAll
    void init(){
        user = new AppUser("xyz","zyx","example@example.com","password",AppUserRole.COACH);
    }
    @Test
    void testgetPassword(){
        assertEquals(user.getPassword(),"password");
    }
    @Test
    void testgetUsername(){
        assertEquals(user.getUsername(),"example@example.com");
    }
    @Test
    void testgetFirstName(){
        assertEquals(user.getFirstName(),"xyz");
    }
    @Test
    void testgetLastName(){
        assertEquals(user.getLastName(),"zyx");
    }
    @Test
    void testisAccountNonExpired(){
        assertTrue(user.isAccountNonExpired());
    }
    @Test
    void testisAccountNonLocked(){
        assertTrue(user.isAccountNonLocked());
    }
    @Test
    void testisCredentialsNonExpired(){
        assertTrue(user.isCredentialsNonExpired());
    }
    @Test
    void testisEnabled(){
        assertTrue(user.isEnabled());
    }



}
