package com.seb_45_main_021.unkwon.heart.repository;

import com.seb_45_main_021.unkwon.heart.entity.Heart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart,Long> {
    Optional<Heart> findHeartByMemberAndPortfolioId(Member member,String portfolioId);
}
