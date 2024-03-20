package com.example.Stocker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "stocks")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Stock   {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonProperty("Symbol")
    private String symbol;

    @JsonProperty("Name")
    private String name;

    @Column(length = Integer.MAX_VALUE)
    @JsonProperty("Description")
    private String description;

    @JsonProperty("Exchange")
    private String exchange;

    @JsonProperty("Currency")
    private String currency;

    @JsonProperty("Country")
    private String country;

    @JsonProperty("Sector")
    private String sector;

    @JsonProperty("Industry")
    private String industry;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("FiscalYearEnd")
    private String fiscalYearEnd;

    @JsonProperty("LatestQuarter")
    private String latestQuarter;

    @JsonProperty("MarketCapitalization")
    private String marketCapitalization;

    @JsonProperty("PERatio")
    private String peRatio;

    @JsonProperty("PEGRatio")
    private String pegRatio;

    @JsonProperty("BookValue")
    private String bookValue;

    @JsonProperty("DividendPerShare")
    private String dividendPerShare;

    @JsonProperty("DividendYield")
    private String dividendYield;

    @JsonProperty("EPS")
    private String eps;

    @JsonProperty("AnalystTargetPrice")
    private String analystTargetPrice;

    @JsonProperty("AnalystRatingStrongBuy")
    private String analystRatingStrongBuy;

    @JsonProperty("AnalystRatingBuy")
    private String analystRatingBuy;

    @JsonProperty("AnalystRatingHold")
    private String analystRatingHold;

    @JsonProperty("AnalystRatingSell")
    private String analystRatingSell;

    @JsonProperty("AnalystRatingStrongSell")
    private String analystRatingStrongSell;

    @JsonProperty("PriceToBookRatio")
    private String priceToBookRatio;

    @JsonProperty("Beta")
    private String beta;

    @JsonProperty("SharesOutstanding")
    private String sharesOutstanding;

    @JsonProperty("DividendDate")
    private String dividentDate;

    @JsonProperty("ExDividendDate")
    private String exDividentDate;
//    @JsonProperty("prince")
    private String price;

    private String changePrice;

    private String changePercent;


    @JsonIgnore
    @ManyToMany(mappedBy = "stocks" )
    private Set<Portfolio> portfolios;

    @JsonIgnore
    @ManyToMany(mappedBy = "stocks")
    private Set<Wishlist> wishlists;
}
