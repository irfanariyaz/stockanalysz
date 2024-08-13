package com.example.Stocker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
public class AnnualReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @JsonProperty("grossProfit")
    private  String grossProfit;

    @JsonProperty("totalRevenue")
    private  String totalRevenue;

    @JsonProperty("fiscalDateEnding")
    private  String fiscalDateEnding;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    // @JsonIgnore
    private Stock stock;

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public Stock getStock() {
        return stock;
    }
}
