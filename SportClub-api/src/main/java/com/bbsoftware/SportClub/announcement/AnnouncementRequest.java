package com.bbsoftware.SportClub.announcement;

import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementRequest {
    private String text;
    private Long userId;
}
