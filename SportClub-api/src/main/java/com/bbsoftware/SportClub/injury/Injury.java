package com.bbsoftware.SportClub.injury;


import com.bbsoftware.SportClub.appuser.AppUser;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity

public class Injury {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;
    private Date start_date;
    private Date end_date;
    private String description;


    @OneToOne
    private AppUser user;



}
