package com.bbsoftware.SportClub.utils;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import com.bbsoftware.SportClub.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class JwtUtilTest {
    private byte[] SECRET_KEY = "testklucz".getBytes();
    private String token;
    private AppUser user;
    private JwtUtil jwtUtil;
    @BeforeAll
    void setup(){
        jwtUtil = new JwtUtil();
        user = new AppUser("firstName","lastName","mail","pass", AppUserRole.ADMIN);
        token = jwtUtil.generateToken(user);
    }

    @Test
    void extractUsernameTest(){
        String expected = user.getEmail();
        assertTrue(jwtUtil.extractUsername(token).contains(expected));
    }
    @Test
    void extractRoleTest(){
        assertTrue(jwtUtil.extractRole(token).contains(user.getAppUserRole().name()));
    }
    @Test
    void validateTokenTest(){
        assertTrue(jwtUtil.validateToken(token,user));
    }
    @Test
    void validateTokenTest2(){
        AppUser user1 = new AppUser("Wojciech","Olszański","olsz@mail.com","pass",AppUserRole.PLAYER);
        assertFalse(jwtUtil.validateToken(token,user1));
    }
    @Test
    void validateTokenTest3(){
        AppUser user1 = new AppUser("Wojciech","Olszański","olsz@mail.com","pass",AppUserRole.ADMIN);
        assertFalse(jwtUtil.validateToken(token,user1));
    }
    @Test
    void validateTokenTest4(){
        AppUser user1 = new AppUser("Wojciech","Olszański","mail","pass",AppUserRole.PLAYER);
        assertFalse(jwtUtil.validateToken(token,user1));
    }

}
