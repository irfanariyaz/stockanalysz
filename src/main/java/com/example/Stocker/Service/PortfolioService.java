package com.example.Stocker.Service;

import com.example.Stocker.Repository.PortfolioRepository;
import com.example.Stocker.Repository.UserRepository;
import com.example.Stocker.model.Portfolio;
import com.example.Stocker.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PortfolioService {
    @Autowired
    PortfolioRepository portfolioRepository;
    @Autowired
    UserRepository userRepository;

    public User addNewPortfolio(Long id, String name) {
        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);
        Optional<User> getUser = userRepository.findById(id);

        if (getUser.isPresent()){
            User user = getUser.get();
            Set<Portfolio> portfolios = user.getPortfolios();
            portfolios.add(portfolio);
            user.setPortfolios(portfolios);
            portfolio.setUser(user);
            portfolioRepository.save(portfolio);
            return user;
        }
        return new User();

    }

   public Portfolio getPortfolio(long portfolioId) {
       Optional<Portfolio> portfolio =  portfolioRepository.findById(portfolioId);
       return portfolio.orElse(null);
    }

    public void save(Portfolio portfolio) {
        portfolioRepository.save(portfolio);
    }
    public Portfolio findById(long id){
        return portfolioRepository.findById(id).orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }
}
