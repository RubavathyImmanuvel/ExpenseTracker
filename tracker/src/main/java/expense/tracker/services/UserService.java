package expense.tracker.services;

import expense.tracker.models.Role;
import expense.tracker.models.User;
import expense.tracker.repositories.ExpenseRepository;
import expense.tracker.repositories.UserRepository;
import expense.tracker.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private ExpenseService expenseService;

    public String register(User user){
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return "User name already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole() == null){
            user.setRole(Role.USER);
        }
        else if(user.getRole().name().equals("ADMIN")) {
            List<User> admins = userRepository.findByRole(Role.ADMIN);

            if (!admins.isEmpty()) {
                return "Admin already exists! Only one admin is allowed.";
            }
        }
        userRepository.save(user);
        return "Registration successful!";
    }

    public String login(String userName, String password) {
        Optional<User> user = userRepository.findByEmail(userName);
        if(!user.isPresent()){
            return "User doesn't exist";
        }
        if(passwordEncoder.matches(password, user.get().getPassword())){
            return  jwtUtil.generateToken(userName, user.get().getRole().name());
        }
        return "Invalid credentials";
    }

    public String delete(String userName) {
        expenseService.delete(userName);
        Optional<User> user = userRepository.findByEmail(userName);
        if(user.isPresent()){
            userRepository.delete(user.get());
            return "User deleted successfully!";
        }
        return "User doesn't exist";
    }

    public List<User> list() {
        return userRepository.findAll();
    }

    public String role(String userName, String password) {
        Optional<User> user = userRepository.findByEmail(userName);
        if(!user.isPresent()){
            return "User doesn't exist";
        }
        if(passwordEncoder.matches(password, user.get().getPassword())) {
            return user.get().getRole().name();
        }
        return "Invalid credentials";
    }

    public List<User> users() {
        return userRepository.findByRoleNot(Role.ADMIN);
    }
}
