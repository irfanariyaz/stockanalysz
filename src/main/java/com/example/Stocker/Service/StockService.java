package com.example.Stocker.Service;

import com.example.Stocker.Repository.AnnualReportRepository;
//import com.example.Stocker.Repository.IncomeRepository;
import com.example.Stocker.Repository.StockRepository;
import com.example.Stocker.model.AnnualReport;
import com.example.Stocker.model.Stock;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class StockService {


   @Autowired
    StockRepository stockRepository;
    @Autowired
    RestTemplate restTemplate ;
    @Autowired
    AnnualReportRepository annualReportRepository;
    private final  static   String  apiKey = "6ZC3AWD8JBACSWN0";


    //get the stock from the database by the given symbol
    public Optional<Stock> getStock(String symbol) {
        return stockRepository.findBySymbol(symbol);
    }

    public Stock fetchData(String symbol) throws JsonProcessingException {
        Stock response;
       // String  apiKey = "6ZC3AWD8JBACSWN0";
        String url ="https://www.alphavantage.co/query?function=OVERVIEW&apikey={apiKey}&symbol={symbol}";
        response = restTemplate.getForObject(url,  Stock.class,apiKey, symbol);
        System.out.println("data from fetchdata"+ response);
        return  response;
    }

       //fetch data using rest Template
       public Stock getQuote(String symbol ,Stock stock) throws JsonProcessingException {
        String response;

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
               String open = globalQuote.get("02. open").asText();
               String previousClose = globalQuote.get("08. previous close").asText();
               stock.setPrice(price);
               stock.setChangePrice(change);
               stock.setChangePercent(changePercent);
               stock.setOpen(open);
               stock.setPreviousClose(previousClose);
               return stock ;
           }
           return  stock;
    }
    public  Stock getFinancials(String symbol, Stock stock) throws JsonProcessingException {
        //get the annual data
        String url ="https://www.alphavantage.co/query?function=INCOME_STATEMENT&apikey={apiKey}&symbol={symbol}";
        String response = restTemplate.getForObject(url,  String.class,apiKey, symbol);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        JsonNode annualReportsNode = jsonNode.get( "annualReports");
        Set<AnnualReport> annualReportsList = new HashSet<>();

        if (annualReportsNode != null && annualReportsNode.isArray()) {
            for (JsonNode reportNode : annualReportsNode) {
                AnnualReport annualReport = objectMapper.treeToValue(reportNode, AnnualReport.class);
                annualReportsList.add(annualReport);
            }
        }
        System.out.println("annualreportlist b4"+annualReportsList);
        stock.setAnnualReports(annualReportsList);
        stockRepository.save(stock);

        // Set the Income entity for each AnnualReport
        for (AnnualReport annualReport : annualReportsList) {
            annualReport.setStock(stock);
            annualReportRepository.save(annualReport);
        }
        long id = stock.getId();
//        stockRepository.save(stock);
        return stockRepository.findById(id).get();
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
//    private final WebClient webClient;
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
//    public StockService(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder
//                .baseUrl("https://www.alphavantage.co")
//                .build();
//    }