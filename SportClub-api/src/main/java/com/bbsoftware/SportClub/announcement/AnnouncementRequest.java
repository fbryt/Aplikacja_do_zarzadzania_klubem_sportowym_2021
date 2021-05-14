package com.bbsoftware.SportClub.announcement;

import lombok.*;

import java.util.Date;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementRequest {
    private String text;
    private Long userId;
    private Date date;
    private Boolean sendEmail;
}
