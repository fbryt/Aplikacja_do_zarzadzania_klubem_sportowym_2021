package com.bbsoftware.SportClub.utils;

import java.lang.reflect.Array;
import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Stream;

import javax.crypto.spec.SecretKeySpec;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRole;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {
    private byte[] SECRET_KEY = "SabalMetinczykGitZiomalAlkoholik".getBytes();

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractRole(String token) {
        final Claims claims = extractAllClaims(token);
        return claims.get("UserRole").toString();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(AppUser userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername(),userDetails.getAppUserRole().name());
    }

    private String createToken(Map<String, Object> claims, String subject, String role) {

        Key signingKey = new SecretKeySpec(SECRET_KEY, SignatureAlgorithm.HS256.getJcaName());
        claims.put("UserRole",role);
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(signingKey, SignatureAlgorithm.HS256).compact();
    }

    public Boolean validateToken(String token, AppUser userDetails) {
        final String username = extractUsername(token);
        final String role = extractRole(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && role.equals(userDetails.getAppUserRole().name()));
    }
}
