package com.example.Stocker.Controller;

import com.example.Stocker.Repository.StockRepository;
import com.example.Stocker.Service.PortfolioService;
import com.example.Stocker.model.Portfolio;
import com.example.Stocker.model.Stock;
import com.example.Stocker.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class PortfolioController {
    @Autowired
    PortfolioService portfolioService;
    @Autowired
    StockRepository stockRepository;
    //add portfolio to a user
    @PostMapping("/addportfolio/{id}/{name}")
    public User addPortfolio(@PathVariable long id, @PathVariable String name){
        System.out.println("request to create a portfolio reached "+id + name);

        return portfolioService.addNewPortfolio(id, name);
    }
    //add a stock to a portfolio
    @PostMapping("/addStock/portfolio/{stock_id}/{portfolio_id}")
    public User addStockToPortfolio(@PathVariable long stock_id, @PathVariable long portfolio_id) {
        System.out.println("got the request to add a stock to portfolio");
        //get the portfolio with the id
        Portfolio portfolio = portfolioService.findById(portfolio_id);
        Stock stock = stockRepository.findById(stock_id).orElseThrow(() -> new RuntimeException("Stock not found"));
// Add the stock to the portfolio
        portfolio.getStocks().add(stock);
        stock.getPortfolios().add(portfolio);
// Save the changes
        portfolioService.save(portfolio);
        return portfolio.getUser();
    }
    //delete a stock from a portfolio
    @DeleteMapping("/delete/portfolioStock/{stock_id}/{portfolio_id}")
    public  User deleteStock(@PathVariable  long stock_id,@PathVariable long portfolio_id){
        return portfolioService.deletestock(stock_id,portfolio_id);


    }
    @PutMapping("/update/Portfolio")
    public User updatePortfolio(@RequestParam("id") long portfolio_id,
                                     @RequestParam("name")String name){
        System.out.println("request to update reached"+ portfolio_id  +name);
        return  portfolioService.updatePortfolio(portfolio_id,name);
    }
    //delete the portfolio
    @DeleteMapping("/delete/{user_id}/{portfolio_id}")
    public User deletePortfolio(@PathVariable long portfolio_id,@PathVariable long user_id) {
        return portfolioService.deletePortfolio(portfolio_id,user_id);
    }

    }


