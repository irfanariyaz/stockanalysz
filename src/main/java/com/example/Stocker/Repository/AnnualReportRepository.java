package com.example.Stocker.Repository;

import com.example.Stocker.model.AnnualReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnualReportRepository extends JpaRepository<AnnualReport,Long> {
}
