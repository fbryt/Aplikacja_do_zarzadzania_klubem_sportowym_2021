package com.bbsoftware.SportClub.security.config;

import java.util.Arrays;

import com.bbsoftware.SportClub.appuser.AppUserService;
import com.bbsoftware.SportClub.filters.JwtRequestFilter;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, proxyTargetClass = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppUserService appUserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().headers().frameOptions().disable();

        // http.authorizeRequests().antMatchers("/register/**").permitAll().antMatchers("/login*").permitAll().anyRequest()
        // .authenticated().and().formLogin().usernameParameter("email").defaultSuccessUrl("/dashboard",
        // true);

        http.csrf().disable().authorizeRequests()
                .antMatchers("/appUsers/players").hasAuthority( "COACH")
                .antMatchers("/appUsers/**", "/register").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,"/injury").hasAuthority("PLAYER")
                .antMatchers(HttpMethod.DELETE,"/injury/**").hasAuthority("PLAYER")
                .antMatchers(HttpMethod.PATCH,"/injury/**").hasAuthority("PLAYER")
                .antMatchers(HttpMethod.GET,"/injury/**").hasAuthority("COACH").antMatchers(HttpMethod.POST,"/injury").hasAuthority("PLAYER")
                .antMatchers(HttpMethod.DELETE,"/contract/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PATCH,"/contract/**").hasAuthority("ADMIN")
                .antMatchers("/myPlayers").hasAuthority("COACH")
                .antMatchers(HttpMethod.POST,"/event").hasAuthority("COACH")
                .antMatchers(HttpMethod.POST,"/announcements").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,"announcements/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PATCH,"announcements/**").hasAuthority("ADMIN")
                .antMatchers("/playersWithCoach").hasAuthority("ADMIN")
                .antMatchers("/authenticate", "/forgotpassword/**", "/h2-console/**", "/", "/db/**").permitAll()
                .anyRequest().authenticated().and().exceptionHandling().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserService);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration cc = new CorsConfiguration();
        cc.addAllowedOriginPattern("*");
        cc.setAllowedMethods(Arrays.asList("*"));
        cc.setAllowedHeaders(Arrays.asList("*"));
        cc.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", cc);
        return source;
    }
}
