package com.bbsoftware.SportClub.injury;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.persistence.criteria.CriteriaBuilder;

import java.security.Principal;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest
public class InjuryTestController {
    @Autowired
    private MockMvc mockMvc;


    @Test
    @WithUserDetails("pablo@xanadu.com")
    public void listAllAndClaim() throws Exception
    {

        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/injuries");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();


        assertFalse(result.getResponse().getContentAsString().contains("OOO1"));
        mockMvc.perform(MockMvcRequestBuilders.post("/injuries").
                content(asJsonString(new InjuryRequest(new Date(),new Date(),"OOO1",4L))).
                contentType(MediaType.APPLICATION_JSON).
                accept(MediaType.APPLICATION_JSON));

        requestBuilder= MockMvcRequestBuilders.get("/injuries");
        result = mockMvc.perform(requestBuilder).andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("OOO1"));
    }
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
}}
