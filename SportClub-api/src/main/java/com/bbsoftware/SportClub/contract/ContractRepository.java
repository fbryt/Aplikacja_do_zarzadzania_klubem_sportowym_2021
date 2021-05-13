package com.bbsoftware.SportClub.contract;

import com.bbsoftware.SportClub.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long>{

    public Optional <Contract> findByUser_id(Long id);
}