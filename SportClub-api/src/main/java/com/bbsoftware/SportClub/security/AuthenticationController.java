package com.bbsoftware.SportClub.security;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.utils.JwtUtil;
import com.bbsoftware.SportClub.appuser.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private AppUserService userDetailsService;

    @GetMapping("/hello")
    public String firstPage() {
        return "Hello World";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final AppUser userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        final Long id = userDetails.getId();

        return ResponseEntity.ok(new AuthenticationResponse(jwt, id ));
    }
}
