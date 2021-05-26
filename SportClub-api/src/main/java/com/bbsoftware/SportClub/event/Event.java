package com.bbsoftware.SportClub.event;

import com.bbsoftware.SportClub.appuser.AppUser;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;

    private String message;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<AppUser> appUsers;

    Date dateStart;
    Date dateEnd;
}
