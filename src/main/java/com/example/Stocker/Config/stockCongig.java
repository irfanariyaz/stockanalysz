package com.example.Stocker.Config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class stockCongig {
    //using restTemplate to fetch
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {

        return builder.build();
    }
    //use webclient to fetch
//    @Bean
//    public WebClient webClientBuilder() {
//        return WebClient.builder().baseUrl("https://www.alphavantage.co/query?function=OVERVIEW&apikey=6ZC3AWD8JBACSWN0&").build();
//    }
}
