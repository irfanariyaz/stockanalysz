package com.example.Stocker.Repository;

import com.example.Stocker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findAllByEmailAndPassword(String email,String password);
}
