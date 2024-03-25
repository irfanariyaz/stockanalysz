package com.example.Stocker.Service;

import com.example.Stocker.Repository.StockRepository;
import com.example.Stocker.Repository.UserRepository;
import com.example.Stocker.Repository.WishlistRepository;
import com.example.Stocker.model.Portfolio;
import com.example.Stocker.model.Stock;
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
    @Autowired
    StockRepository stockRepository;
    public User addNewWishlist(long id, String name) {
        Wishlist wishlist = new Wishlist();
        wishlist.setName(name);
        User user = userRepository.findById(id).get();
        user.getWishlists().add(wishlist);
        wishlist.setUser(user);
        wishlistRepository.save(wishlist);
        return user;
    }

    public Wishlist findById(long wishlistId) {
        return wishlistRepository.findById(wishlistId).orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }
    public User deletestock(long stockId, long wishlistId) {
        // get the portfolio and delete the stock
        Wishlist wishlist = wishlistRepository.findById(wishlistId).get();
        Stock stock = stockRepository.findById(stockId).get();
        wishlist.getStocks().remove(stock);
        wishlistRepository.save(wishlist);
        System.out.println("removed stock from the portfolio");
        return wishlist.getUser();
    }

    public void save(Wishlist wishlist) {
        wishlistRepository.save(wishlist);
    }
}
