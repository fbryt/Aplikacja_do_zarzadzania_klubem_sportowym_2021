package com.bbsoftware.SportClub.injury;

import lombok.*;

import java.util.Date;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class InjuryRequest {

    private Date start_date;
    private Date end_date;
    private String description;
    private Long userId;
}
