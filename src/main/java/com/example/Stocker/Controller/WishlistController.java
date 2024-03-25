package com.example.Stocker.Controller;

import com.example.Stocker.Repository.StockRepository;
import com.example.Stocker.Service.PortfolioService;
import com.example.Stocker.Service.WishlistService;
import com.example.Stocker.model.Portfolio;
import com.example.Stocker.model.Stock;
import com.example.Stocker.model.User;
import com.example.Stocker.model.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    //add a stock to a portfolio
    @PostMapping("/addStock/wishlist/{stock_id}/{wishlist_id}")
    public User addStockTWishlist(@PathVariable long stock_id, @PathVariable long wishlist_id) {
        System.out.println("got the request to add a stock to wishlist");
        //get the wishlist with the id
        Wishlist wishlist = wishlistService.findById(wishlist_id);
        Stock stock = stockRepository.findById(stock_id).orElseThrow(() -> new RuntimeException("Stock not found"));
// Add the stock to the wishist
        wishlist.getStocks().add(stock);
        stock.getWishlists().add(wishlist);
// Save the changes
        wishlistService.save(wishlist);
        return wishlist.getUser();
    }
    @DeleteMapping("/delete/wishlistStock/{stock_id}/{wishlist_id}")
    public  User deleteStock(@PathVariable  long stock_id,@PathVariable long wishlist_id){
        return wishlistService.deletestock(stock_id,wishlist_id);


    }
}
