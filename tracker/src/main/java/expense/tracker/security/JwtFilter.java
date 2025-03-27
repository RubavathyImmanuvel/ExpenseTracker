package expense.tracker.security;

import expense.tracker.models.User;
import expense.tracker.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends GenericFilterBean {
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserRepository userRepository;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;

        String auth = httpServletRequest.getHeader("Authorization");

        if(auth != null && auth.startsWith("Bearer ")){
            String token = auth.substring(7);

            if(jwtUtil.validateToken(token)){
                String userName = jwtUtil.extractUserName(token);
                String role = jwtUtil.extractRole(token);

                Optional<User> user = userRepository.findByEmail(userName);
                if(user.isPresent()){
                    String email = user.get().getEmail();
                    String password = user.get().getPassword();
                UserDetails userDetails = org.springframework.security.core.userdetails.User
                        .withUsername(email)
                        .password(password)
                        .roles(role)
                        .build();

                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
