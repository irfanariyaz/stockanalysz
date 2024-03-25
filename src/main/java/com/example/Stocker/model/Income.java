//package com.example.Stocker.model;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.util.List;
//
//@Entity
//@Table(name = "income_statement")
//@Getter
//@Setter
//@NoArgsConstructor
//public class Income {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private  long id;
//
//    @OneToOne(fetch=FetchType.LAZY)
//    private  Stock stock;
//
//    @OneToMany(mappedBy = "income" ,cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<AnnualReport> annualReports;
//
//}
