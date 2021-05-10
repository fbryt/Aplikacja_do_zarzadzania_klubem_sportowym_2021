package com.bbsoftware.SportClub.announcement;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.contract.Contract;
import com.bbsoftware.SportClub.contract.ContractRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.CALLS_REAL_METHODS;
import static org.mockito.Mockito.mock;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AnnouncementTest {

    @InjectMocks
    private static AnnouncementRepository repository;
    private static AppUserRepository user_repository;

    @BeforeAll
    void init(){
        repository = mock(AnnouncementRepository.class,CALLS_REAL_METHODS);
        user_repository = mock(AppUserRepository.class,CALLS_REAL_METHODS);
    }
    @Test
    public void insertTest()
    {
        AppUser user = new AppUser("xyz","zyx","example@example.com","password", AppUserRole.COACH);
        Contract contract = new Contract();
        contract.setMoney(3000L);
        Announcement announcement=new Announcement();
        announcement.setText("testowe");
        List<Announcement> list=new ArrayList<>();
        list.add(announcement);
        user.setAnnouncements(list);

        repository.save(announcement);
        user_repository.save(user);

        assertEquals(user.getAnnouncements().get(0).getId(),announcement.getId());
    }
}
