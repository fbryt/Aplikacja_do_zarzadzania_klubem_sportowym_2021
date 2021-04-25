package com.bbsoftware.SportClub.AdminTools;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@SpringBootTest
public class AdminToolsTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles="ADMIN")
    public void roleADM() throws Exception
    {
        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/appUsers/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        assertTrue(result.getResponse().getContentAsString().contains("Pablo"));
    }

    @Test
    @WithMockUser(roles="COACH")
    public void roleCOACH() throws Exception
    {
        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/appUsers/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        assertFalse(result.getResponse().getContentAsString().contains("Pablo"));
    }

    @Test
    @WithMockUser(roles="PLAYER")
    public void rolePLAYER() throws Exception
    {
        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/appUsers/1");
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        assertFalse(result.getResponse().getContentAsString().contains("Pablo"));
    }


}
