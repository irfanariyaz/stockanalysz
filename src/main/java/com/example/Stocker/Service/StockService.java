package com.example.Stocker.Service;

import com.example.Stocker.Repository.StockRepository;
import com.example.Stocker.model.Stock;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockService {

//    private final WebClient webClient;
   @Autowired
    StockRepository stockRepository;
    @Autowired
    RestTemplate restTemplate ;

//    public StockService(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder
//                .baseUrl("https://www.alphavantage.co")
//                .build();
//    }
    //get the stock from the database by the given symbol
    public Optional<Stock> getStock(String symbol) {
        return stockRepository.findBySymbol(symbol);
    }
//    public Stock fetchData(String symbol) {
//        String api = "6ZC3AWD8JBACSWN0";
//
//        return webClient
//                .get()
//                .uri(uriBuilder -> uriBuilder.path("/query")
//                        .queryParam("apikey",api)
//                        .queryParam("function","OVERVIEW")
//                        .queryParam("symbol", symbol)
//                        .build())
//                .retrieve()
//                .bodyToMono(Stock.class)
//                .log("stock added" )
//                .block(); // block() used for simplicity; in a real application, prefer reactive approach
//    }
    public Stock fetchData(String symbol) throws JsonProcessingException {
        Stock response;
        String  apiKey = "6ZC3AWD8JBACSWN0";
        String url ="https://www.alphavantage.co/query?function=OVERVIEW&apikey={apiKey}&symbol={symbol}";
        response = restTemplate.getForObject(url,  Stock.class,apiKey, symbol);
        System.out.println("data from fetchdata"+ response);
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readTree(response);
        return  response;

    }

       //fetch data using rest Template
       public Stock getQuote(String symbol ,Stock stock) throws JsonProcessingException {
        String response;
        String  apiKey = "6ZC3AWD8JBACSWN0";
       // String url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey="+apiKey;
        String url ="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey={apiKey}&symbol={symbol}";
        response = restTemplate.getForObject(url,  String.class,apiKey, symbol);
        System.out.println("quote");
           ObjectMapper objectMapper = new ObjectMapper();
           JsonNode jsonNode = objectMapper.readTree(response);
           JsonNode globalQuote = jsonNode.get( "Global Quote");
           System.out.println("global quote  "+globalQuote+url);
           if(globalQuote!=null){
               String price = globalQuote.get("05. price").asText();
               System.out.println("price" +price);
               System.out.println("price" +price);
               String change = globalQuote.get("09. change").asText();
               String changePercent = globalQuote.get("10. change percent").asText();
               stock.setPrice(price);
               stock.setChangePrice(change);
               stock.setChangePercent(changePercent);
               return stock ;
           }
           return  stock;
    }

    public void saveStock(Stock stock) {
        stockRepository.save(stock);
    }

    public List<String> getStockSymbols() {
        return stockRepository.findAllBySymbol();
    }
    public List<String> searchSymbols(String query){
        List<String> stockSymbols = getStockSymbols();
        return stockSymbols.stream()
                .filter(symbol -> symbol.contains(query))
                .collect(Collectors.toList());
    }

}
