package com.example.Stocker.Repository;

import com.example.Stocker.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    static  final  User user = new User("testuser","password","testuser@gmail.com");

    @Test
    void findByEmail() {
        //create an user
        userRepository.save(user);
        String email = userRepository.findByEmail("testuser@gmail.com").getEmail();
        assertEquals("testuser@gmail.com",email);
        userRepository.delete(user);
    }

    @Test
    void findAllByEmailAndPassword() {
        userRepository.save(user);
        User user = userRepository.findAllByEmailAndPassword("testuser@gmail.com","password");
        assertEquals("testuser@gmail.com",user.getEmail());
        assertEquals("password",user.getPassword());
        userRepository.save(user);
    }
}