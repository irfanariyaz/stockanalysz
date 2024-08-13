package com.example.Stocker.Controller;

import com.example.Stocker.Service.StockService;
import com.example.Stocker.model.Stock;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    StockService stockService;

    @GetMapping("/stock/{symbol}")
    public Stock searchTicker(@PathVariable String symbol) throws JsonProcessingException {
        System.out.println("request reached");
        //Search if ticker is in the database
        Optional<Stock> st = stockService.getStock(symbol);
        if(st.isPresent()){  //yes
            System.out.println("stock  in database");
            Stock stock = st.get();
           stock = stockService.getQuote(symbol,stock);
           stock = stockService.getFinancials(symbol,stock);
         //   System.out.println("stock in after saving ann rep "+stock.getAnnualReports());
            return stock;
        }else  // stock not in database  then fetch the stock data
        {
            Stock stock = stockService.fetchData(symbol);
            System.out.println("got the stock from fetching"+stock);
            stock = stockService.getQuote(symbol,stock);
           // stock = stockService.getFinancials(symbol,stock);

            if(stock.getName()!=null){
                stockService.saveStock(stock);
                System.out.println("stock saved in database");
            }

            return stock;
        }
}


}
