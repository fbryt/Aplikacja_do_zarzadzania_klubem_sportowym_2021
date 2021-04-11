package com.bbsoftware.SportClub.registration;

import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.appuser.AppUserService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)


public class RegistrationServiceTest{

    @InjectMocks
    private RegistrationService registrationService;

    private AppUserService appUserService;
    private EmailValidator emailValidator;
    private EmptyValidator emptyValidator;
    static final Logger logger = Logger.getLogger(RegistrationServiceTest.class.getName());


    @BeforeAll
    void init(){
        appUserService = mock(AppUserService.class);
        emailValidator = mock(EmailValidator.class);
        emptyValidator = mock(EmptyValidator.class);
    }
    @BeforeEach
    void beforeEach(TestInfo testInfo){
        logger.info(()->String.format("Executing [%s]",testInfo.getDisplayName()));
    }
    @Test
    @DisplayName("test register method with invalid email")
    void testRegister(){
        when(emailValidator.test("email")).thenReturn(false);
        RegistrationRequest request = new RegistrationRequest("xyz","zyx","email","password",AppUserRole.ADMIN);
        Exception exception = assertThrows(IllegalStateException.class,() -> {registrationService.register(request); });
        String expectedMsg = "Email is not valid";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

    @Test
    @DisplayName("test register method with empty first name")
    void testRegister1(){
        when(emailValidator.test("email")).thenReturn(true);
        when(emptyValidator.test("xyz")).thenReturn(false);
        when(emptyValidator.test("zyx")).thenReturn(true);
        when(emptyValidator.test("password")).thenReturn(true);
        when(emptyValidator.test("ADMIN")).thenReturn(true);
        RegistrationRequest request = new RegistrationRequest("xyz","zyx","email","password",AppUserRole.ADMIN);
        Exception exception = assertThrows(IllegalStateException.class,() -> {registrationService.register(request); });
        String expectedMsg = "Any form field is empty";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

    @Test
    @DisplayName("test register method with empty last name")
    void testRegister2(){
        when(emailValidator.test("email")).thenReturn(true);
        when(emptyValidator.test("xyz")).thenReturn(false);
        when(emptyValidator.test("zyx")).thenReturn(true);
        when(emptyValidator.test("password")).thenReturn(true);
        when(emptyValidator.test("ADMIN")).thenReturn(true);
        RegistrationRequest request = new RegistrationRequest("xyz","zyx","email","password",AppUserRole.ADMIN);
        Exception exception = assertThrows(IllegalStateException.class,() -> {registrationService.register(request); });
        String expectedMsg = "Any form field is empty";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

    @Test
    @DisplayName("test register method with empty password")
    void testRegister3(){
        when(emailValidator.test("email")).thenReturn(true);
        when(emptyValidator.test("xyz")).thenReturn(true);
        when(emptyValidator.test("zyx")).thenReturn(true);
        when(emptyValidator.test("password")).thenReturn(false);
        when(emptyValidator.test("ADMIN")).thenReturn(true);
        RegistrationRequest request = new RegistrationRequest("xyz","zyx","email","password",AppUserRole.ADMIN);
        Exception exception = assertThrows(IllegalStateException.class,() -> {registrationService.register(request); });
        String expectedMsg = "Any form field is empty";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

    @Test
    @DisplayName("test register method with empty role")
    void testRegister4(){
        when(emailValidator.test("email")).thenReturn(true);
        when(emptyValidator.test("xyz")).thenReturn(true);
        when(emptyValidator.test("zyx")).thenReturn(true);
        when(emptyValidator.test("password")).thenReturn(true);
        when(emptyValidator.test("ADMIN")).thenReturn(false);
        RegistrationRequest request = new RegistrationRequest("xyz","zyx","email","password",AppUserRole.ADMIN);
        Exception exception = assertThrows(IllegalStateException.class,() -> {registrationService.register(request); });
        String expectedMsg = "Any form field is empty";
        String actualMsg = exception.getMessage();
        assertTrue(actualMsg.contains(expectedMsg));
    }

}