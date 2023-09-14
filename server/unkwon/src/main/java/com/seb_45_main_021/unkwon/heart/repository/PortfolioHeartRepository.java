package com.seb_45_main_021.unkwon.heart.repository;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PortfolioHeartRepository extends JpaRepository<PortfolioHeart,Long> {

    PortfolioHeart findByPortFolioAndMember(Portfolio portFolio, Member member);

    Page<PortfolioHeart> findByMember(Member member, Pageable pageable);

    boolean existsByPortFolioAndMember(Portfolio portFolio, Member member);

    List<PortfolioHeart> findByPortFolio(Portfolio portFolio);
    @Query("SELECT p.portFolio FROM PortfolioHeart p WHERE p.createdAt >= :oneWeekAgo GROUP BY p.portFolio ORDER BY COUNT(p.portFolio) DESC")
    List<Portfolio> findTop10PortfoliosByHeartsLast7Days(@Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable pageable);

    List<PortfolioHeart> findByMember(Member member);
}