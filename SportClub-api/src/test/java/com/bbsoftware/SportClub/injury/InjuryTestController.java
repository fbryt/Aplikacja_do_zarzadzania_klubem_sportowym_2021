package com.bbsoftware.SportClub.injury;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.persistence.criteria.CriteriaBuilder;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
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
    @WithMockUser(authorities="PLAYER")
    public void listAllAndClaim() throws Exception
    {
        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/injuries");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        assertFalse(result.getResponse().getContentAsString().contains("OOO1"));
        mockMvc.perform(MockMvcRequestBuilders.post("/injuries").with(user("pablo@magenta.com").roles("PLAYER")).with(csrf()).
                content(asJsonString(new InjuryRequest(new Date(),new Date(),"OOO1",4L))).
                contentType(MediaType.APPLICATION_JSON).
                accept(MediaType.APPLICATION_JSON)).andExpect(status().isCreated());

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
