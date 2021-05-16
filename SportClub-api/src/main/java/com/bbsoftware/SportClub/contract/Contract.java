package com.bbsoftware.SportClub.contract;

import javax.persistence.*;
import java.util.Date;

import com.bbsoftware.SportClub.appuser.AppUser;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Contract {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;
    private Date start_date;
    private Date end_date;
    private long money;

    @OneToOne
    private AppUser user;

}
