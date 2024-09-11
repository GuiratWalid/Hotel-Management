package com.booking.HotelServer.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final String base64Key = "eYCbkiPwQOHc14Jw43ZMcQ";

//    public JwtUtil() {
//        // Generate base64Key
//        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        this.base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
//    }

    private String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){
        System.out.println("************************************************* generate token 2 **************************************************************");
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public String generateToken(UserDetails userDetails){
        System.out.println("************************************************* generate token 1 **************************************************************");
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && ! isTokenExpired(token);
    }

    private Claims extractAllClaims(String token){
        System.out.println("************************************************* extractAllClaims **************************************************************");
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    public String extractUserName(String token){
        System.out.println("************************************************* extractUserName **************************************************************");
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token){
        System.out.println("************************************************* extractExpiration **************************************************************");
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        System.out.println("************************************************* isTokenExpired **************************************************************");
        return extractExpiration(token).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers){
        System.out.println("************************************************* extractClaim **************************************************************");
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private Key getSigningKey(){
        System.out.println("************************************************* getSigningKey **************************************************************");
        byte[] keyBytes = Decoders.BASE64.decode(base64Key);
        return Keys.hmacShaKeyFor((keyBytes));
    }

}
