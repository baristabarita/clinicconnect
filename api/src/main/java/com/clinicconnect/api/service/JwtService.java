package com.clinicconnect.api.service;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import java.util.Date;
import java.time.Instant;
import org.springframework.stereotype.Service;
import com.clinicconnect.api.model.User;

import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String jwtSecret;

    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        Instant now = Instant.now();
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getEmail());
        claims.put("userType", user.getUserType());
        claims.put("fname", user.getFname());
        claims.put("lname", user.getLname());
        claims.put("mname", user.getMname());
        claims.put("contact", user.getContact());
        claims.put("birthday", user.getBirthday() != null ? user.getBirthday().toString() : null);
        claims.put("age", user.getAge());
        claims.put("gender", user.getGender());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(24 * 60 * 60)))
                .signWith(getSigningKey())
                .compact();
    }
} 