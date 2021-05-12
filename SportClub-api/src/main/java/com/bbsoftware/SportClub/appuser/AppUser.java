package com.bbsoftware.SportClub.appuser;

import com.bbsoftware.SportClub.contract.Contract;
import com.bbsoftware.SportClub.announcement.Announcement;
import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.DoubleStream;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@JsonIgnoreProperties(value={ "coach", "players" })
//sprawdzić tego settera
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private String resetToken;

    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;


    @ManyToOne
    private AppUser coach;
    @OneToMany(mappedBy="coach")
    private List<AppUser> players;


    private Boolean locked = false;
    private Boolean enabled = true;
    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Announcement> announcements;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Contract contract;

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }


    public AppUser(String firstName, String lastName, String email, String password, AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
        this.resetToken = "";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());

        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }


    public void setPlayers(AppUser user){

        this.players.add(user);
    }

    public void setCoach(AppUser user){

        this.coach = user;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


}
