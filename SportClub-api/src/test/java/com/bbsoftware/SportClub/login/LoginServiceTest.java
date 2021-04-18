package com.bbsoftware.SportClub.login;

import com.bbsoftware.SportClub.login.LoginService;
import com.bbsoftware.SportClub.registration.RegistrationRequest;
import net.bytebuddy.pool.TypePool;
import org.junit.jupiter.api.*;
import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.appuser.AppUserService;
import com.bbsoftware.SportClub.registration.EmailValidator;
import com.bbsoftware.SportClub.registration.EmptyValidator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class LoginServiceTest {

    @InjectMocks
    private LoginService service;

    private EmailValidator emailValidator;
    private EmptyValidator emptyValidator;
    private AppUserService appUserService;
    @BeforeAll
    void init(){
        emailValidator = mock(EmailValidator.class);
        emptyValidator = mock(EmptyValidator.class);
        appUserService = mock(AppUserService.class);
    }

    @Test
    @DisplayName("test login with invalid email")
    void testLogin(){
        when(emailValidator.test("email")).thenReturn(false);
        LoginRequest request = new LoginRequest("email","");
        Exception exception = assertThrows(IllegalStateException.class,() -> {service.login(request); });
        String expectedMsg = "Email is not valid";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }
    @Test
    @DisplayName("test login with empty password")
    void testLoginwithEmptyPassword(){
        when(emailValidator.test("email")).thenReturn(true);
        when(emptyValidator.test("xyz")).thenReturn(false);
        LoginRequest request = new LoginRequest("email","xyz");
        Exception exception = assertThrows(IllegalStateException.class,() -> {service.login(request); });
        String expectedMsg = "Any form field is empty";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

    @Test
    @DisplayName("test login with valid credentials")
    void testLoginWithValidCredentials(){
        when(emailValidator.test("email")).thenReturn(true);
        when(emptyValidator.test("xyz")).thenReturn(true);
        when(appUserService.signInUser("email","xyz")).thenReturn("signIn");
        LoginRequest request = new LoginRequest("email","xyz");
        String expectedMsg = "signIn";
        String actualMsg = service.login(request);
        assertTrue(actualMsg.contains(expectedMsg));
    }


}
