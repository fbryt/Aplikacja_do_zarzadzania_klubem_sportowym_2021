package com.bbsoftware.SportClub.event;


import com.bbsoftware.SportClub.appuser.AppUser;
import lombok.*;

import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.Date;
import java.util.List;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class EventRequest {
    private String message;
    Date dateStart;
    Date dateEnd;
}
