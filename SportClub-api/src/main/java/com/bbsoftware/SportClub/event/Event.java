package com.bbsoftware.SportClub.event;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
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
public class Event {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("title")
    private String message;

    public void setAppUsers(List<AppUser> appUsers) {
        this.appUsers = new ArrayList<>();
        this.appUsers.addAll(appUsers);
    }

    public void addAppUser(AppUser user){
        this.appUsers.add(user);
    }

    @ManyToMany(fetch = FetchType.EAGER)
    public List<AppUser> appUsers;

    @JsonProperty("start")
    Date dateStart;
    @JsonProperty("end")
    Date dateEnd;
}

