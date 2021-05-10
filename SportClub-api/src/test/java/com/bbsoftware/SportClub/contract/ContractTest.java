package com.bbsoftware.SportClub.contract;
import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import com.bbsoftware.SportClub.appuser.AppUserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.CALLS_REAL_METHODS;
import static org.mockito.Mockito.mock;


@TestInstance(Lifecycle.PER_CLASS)

public class ContractTest {
    @InjectMocks


    private static ContractRepository repository;
    private static AppUserRepository user_repository;

    @BeforeAll
    void init(){
        repository = mock(ContractRepository.class,CALLS_REAL_METHODS);
        user_repository = mock(AppUserRepository.class,CALLS_REAL_METHODS);
    }
    @Test
    public void insertTest()
    {
        AppUser user = new AppUser("xyz","zyx","example@example.com","password", AppUserRole.COACH);
        Contract contract = new Contract();
        contract.setMoney(3000L);
        Date start = new Date(System.currentTimeMillis());
        Date end = new Date(System.currentTimeMillis());
        contract.setStart_date(start);
        contract.setEnd_date(end);
        repository.save(contract);
        user.setContract(contract);
        user_repository.save(user);
        //user.setContract(contract);
        assertEquals(user.getContract().getId(), contract.getId());
    }
}
