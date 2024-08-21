package com.example.Stocker.Controller;

import com.example.Stocker.Service.UserService;
import com.example.Stocker.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/users")
    public String createUser(@RequestParam("image")MultipartFile file,
                                             @RequestParam("username") String username,
                                             @RequestParam("email") String email,
                                             @RequestParam("password") String password
                                             ) {
        System.out.println("request came");
        String imagePath = userService.uploadFile(file);
        System.out.println("image Path ="+imagePath);
        try {
            //check if user in the database?\
            User user = userService.getuser(email);
            if(user==null) {
                // If not present, save user to database
                userService.saveUser(username, email, password, imagePath);
//                User user1 = userService.getuser(email);
                return "ok";
            }else{
//                return ResponseEntity.ok("User already present");
                return "User already Present";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
    @PostMapping("/user")
    public ResponseEntity<Object> getUserDetails(@RequestBody User user ) {
     System.out.println("authenticating...."+user.getEmail()+" "+user.getPassword());
     User userdb = userService.authenticate(user);
     System.out.println("user from database"+user.getPassword());
        Map<String, String> response = new HashMap<>();
     if(userdb==null){
         response.put("message", "No User found.Sign Up");
         return ResponseEntity.ok(response);
     } else if (!user.getPassword().equals(userdb.getPassword())){
            response.put("message", "Email and Password does not match");
            return ResponseEntity.ok(response);
     }
        return ResponseEntity.ok(userdb);
    }
    @GetMapping("/users/{email}")
    public User getUserDetails(@PathVariable String email){
        System.out.println("gott the request to retrive a user by email");
        User user =  userService.getuser(email);
        if(user == null){
            return new User();
        }
        return user;
    }
}
