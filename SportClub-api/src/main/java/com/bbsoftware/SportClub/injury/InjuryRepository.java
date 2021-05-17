package com.bbsoftware.SportClub.injury;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)

public interface InjuryRepository extends JpaRepository<Injury, Long> {
}
