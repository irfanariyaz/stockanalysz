//package com.example.Stocker.Controller;
//
//import com.example.Stocker.Service.StockService;
//import com.example.Stocker.model.Stock;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import java.util.Optional;
//
//@Controller
//public class MainController {
//    @Autowired
//    StockService stockService;
//
//    @GetMapping("/home")
//    public String home(Model model){
//       model.addAttribute("symbols", "");
//        return "index";
//    }
//    @GetMapping("/symbols")
//    public String searchSymbols(@RequestParam String query, Model model) {
//        // Implement your search logic based on the query
//        // For simplicity, just filter the symbols that contain the query in either symbol or name
//        model.addAttribute("symbols", stockService.searchSymbols(query));
//        return "fragments/symbol-list :: symbolList";
//    }
//
//    @PostMapping("/search-ticker")
//    public String searchTicker(@RequestParam String symbol, Model model){
//        //Search if ticker is in the database
//        Optional<Stock> st = stockService.getStock(symbol);
//        if(st.isPresent()){  //yes
//            System.out.println("stock not in database");
//            Stock stock = st.get();
//            model.addAttribute("stock",stock);
//            return "main-page";
//        }else  // stock not in database  then fetch the stock data
//        {
//            Stock stock = stockService.fetchData(symbol);
//            System.out.println(stock);
//            if(stock.getName()!=null){
//            stockService.saveStock(stock);
//            System.out.println("stock saved in database");
//            }
//            System.out.println("no such stock");
//            model.addAttribute("stock",stock);
//            return "main-page";
//        }
//    }
//}
