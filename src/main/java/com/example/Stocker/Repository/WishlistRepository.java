package com.example.Stocker.Repository;

import com.example.Stocker.Service.WishlistService;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Stocker.model.Wishlist;
public interface WishlistRepository extends JpaRepository<Wishlist ,Long> {
}
