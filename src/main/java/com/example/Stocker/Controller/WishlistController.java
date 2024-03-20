package com.example.Stocker.Controller;

import com.example.Stocker.Repository.StockRepository;
import com.example.Stocker.Service.PortfolioService;
import com.example.Stocker.Service.WishlistService;
import com.example.Stocker.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WishlistController {
    @Autowired
    WishlistService wishlistService;
    @Autowired
    StockRepository stockRepository;
    @PostMapping("/addwishlist/{id}/{name}")
    public User addPortfolio(@PathVariable long id, @PathVariable String name){
        System.out.println("request to create a wishlist reached "+id + name);

        return wishlistService.addNewWishlist(id, name);
    }
}
