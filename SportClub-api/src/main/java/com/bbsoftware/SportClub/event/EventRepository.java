package com.bbsoftware.SportClub.event;


import com.bbsoftware.SportClub.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface EventRepository extends JpaRepository<Event, Long> {

    public List<Event> findByAppUsersIdAndDateStartGreaterThanEqualAndDateEndLessThanEqual(Long id,Date start,Date end);
    List<Event> findAllByAppUsersId(Long id);
}