package com.bbsoftware.SportClub.event;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@JsonIgnoreProperties ("appUsers")
@JsonSerialize(using = EventSerializer.class)
public class Event {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;

    private String message;

    public void setAppUsers(List<AppUser> appUsers) {
        this.appUsers = new ArrayList<>();
        this.appUsers.addAll(appUsers);
    }

    @ManyToMany(fetch = FetchType.EAGER)
    public List<AppUser> appUsers;

    Date dateStart;
    Date dateEnd;
}

