package com.example.Stocker.Service;

import com.example.Stocker.Repository.UserRepository;
import com.example.Stocker.Repository.WishlistRepository;
import com.example.Stocker.model.User;
import com.example.Stocker.model.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {
    @Autowired
    WishlistRepository wishlistRepository;
    @Autowired
    UserRepository userRepository;
    public User addNewWishlist(long id, String name) {
        Wishlist wishlist = new Wishlist();
        wishlist.setName(name);
        User user = userRepository.findById(id).get();
        user.getWishlists().add(wishlist);
        wishlist.setUser(user);
        wishlistRepository.save(wishlist);
        return user;
    }
}
