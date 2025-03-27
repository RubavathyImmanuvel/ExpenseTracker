package expense.tracker.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.security}")
    private String securityKey;

    public String generateToken(String userName, String role){
        return Jwts.builder()
                .setSubject(userName)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000))
                .signWith(Keys.hmacShaKeyFor(securityKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(securityKey.getBytes())
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public String extractUserName(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(securityKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(securityKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }
}
