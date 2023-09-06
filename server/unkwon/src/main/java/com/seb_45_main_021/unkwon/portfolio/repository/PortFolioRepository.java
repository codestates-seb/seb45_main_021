package com.seb_45_main_021.unkwon.portfolio.repository;


import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;

public interface PortFolioRepository extends JpaRepository<PortFolio,Long> {
    @Query(
            value = "SELECT * FROM PORT_FOLIO AS p WHERE p.tags LIKE :likeQuery",
            countQuery = "SELECT COUNT(*) FROM PORT_FOLIO AS p WHERE p.tags LIKE :likeQuery",
            nativeQuery = true)
    Page<PortFolio> getSearchPortfolioList(String likeQuery, Pageable pageable);

    @Query(
            value = "SELECT * FROM PORT_FOLIO AS p WHERE p.lang LIKE :likeQuery",
            countQuery = "SELECT COUNT(*) FROM PORT_FOLIO AS p WHERE p.lang LIKE :likeQuery",
            nativeQuery = true)
    Page<PortFolio> getSearchPortfolioList1(String likeQuery, Pageable pageable);
    @Query("SELECT p FROM PortFolio p WHERE p.heartAt BETWEEN :startDate AND :endDate ORDER BY p.heartCount DESC")
    Page<PortFolio> findByHeartAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}