package expense.tracker.controllers;

import expense.tracker.models.User;
import expense.tracker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        String result = userService.register(user);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String userName, @RequestParam String password){
        String token = userService.login(userName, password);
        return ResponseEntity.ok(token);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String userName){
        String result = userService.delete(userName);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/list")
    public ResponseEntity<List<User>> list(){
        return ResponseEntity.ok(userService.list());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> users(){
        return ResponseEntity.ok(userService.users());
    }

    @GetMapping("/role")
    public ResponseEntity<String> role(@RequestParam String userName, @RequestParam String password){
        return ResponseEntity.ok(userService.role(userName, password));
    }
}
