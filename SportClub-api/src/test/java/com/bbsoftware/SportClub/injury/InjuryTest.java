package com.bbsoftware.SportClub.injury;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.contract.Contract;
import com.bbsoftware.SportClub.contract.ContractRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.CALLS_REAL_METHODS;
import static org.mockito.Mockito.mock;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class InjuryTest {
    @InjectMocks
    private static InjuryRepository repository;
    private static AppUserRepository user_repository;

    @BeforeAll
    void init(){
        repository = mock(InjuryRepository.class,CALLS_REAL_METHODS);
        user_repository = mock(AppUserRepository.class,CALLS_REAL_METHODS);
    }
    @Test
    public void insertTest() {
        AppUser user = new AppUser("xyz", "zyx", "example@example.com", "password", AppUserRole.COACH);
        Injury injury = new Injury();
        injury.setDescription("Zlamana noga");
        Date start = new Date(System.currentTimeMillis());
        Date end = new Date(System.currentTimeMillis());
        injury.setStart_date(start);
        injury.setEnd_date(end);
        repository.save(injury);
        user.setInjury(injury);
        user_repository.save(user);
        assertEquals(user.getInjury().getId(), injury.getId());
    }
}
