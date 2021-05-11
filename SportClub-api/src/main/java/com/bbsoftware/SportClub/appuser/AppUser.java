package com.bbsoftware.SportClub.appuser;

import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@JsonIgnoreProperties(value={ "coach", "players" }, allowSetters= true)
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;


    //private Integer coach_id;

    @ManyToOne
    private AppUser coach;
    @OneToMany(mappedBy="coach")
    private Collection<AppUser> players = new ArrayList<>();


    private Boolean locked = false;
    private Boolean enabled = true;




    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    private String resetToken;
    public AppUser(String firstName, String lastName, String email, String password, AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
        this.resetToken = "";
        //this.coach_id = 0;
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

    /*public void setCoachId(int user_id){

        this.coach_id = user_id;
    }*/




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
