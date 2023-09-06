package com.seb_45_main_021.unkwon.heart.repository;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioHeartRepository extends JpaRepository<PortfolioHeart,Long> {

    PortfolioHeart findByPortFolioAndMember(PortFolio portFolio, Member member);

    Page<PortfolioHeart> findByMember(Member member, Pageable pageable);

    boolean existsByPortFolioAndMember(PortFolio portFolio, Member member);

    List<PortfolioHeart> findByPortFolio(PortFolio portFolio);

}