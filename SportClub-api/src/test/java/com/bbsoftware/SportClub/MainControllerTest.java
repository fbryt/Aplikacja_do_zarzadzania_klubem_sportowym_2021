package com.bbsoftware.SportClub;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
public class MainControllerTest {

    @Test
    void hello()
    {
        MainController controller=new MainController();
        String response= controller.hello();
        assertEquals("Witajcie sportowe swiry",response);
    }
}
