package com.bbsoftware.SportClub.contract;

import lombok.*;

import java.util.Date;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ContractUpdateRequest {
    private Date start_date;
    private Date end_date;
    private Long money;
}
