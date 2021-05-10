package com.bbsoftware.SportClub.announcement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

}
