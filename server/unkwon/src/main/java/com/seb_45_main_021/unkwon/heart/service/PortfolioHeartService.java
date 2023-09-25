package com.seb_45_main_021.unkwon.heart.service;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.heart.repository.PortfolioHeartRepository;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PortfolioHeartService {

    private final PortfolioHeartRepository portfolioHeartRepository;
    private final MemberRepository memberRepository;


    public PortfolioHeart heart(Member member, Portfolio portFolio){
        PortfolioHeart portfolioHeart = new PortfolioHeart(true,member,portFolio);


        LocalDateTime localDateTime = LocalDateTime.now(); // 현재 시간을 나타내는 LocalDateTime 객체를 얻습니다.
        portfolioHeart.setCreatedAt(localDateTime); // 포트폴리오 하트의 생성일자를 설정합니다.
        portFolio.setHeartCount(portFolio.getHeartCount() + 1);


        return portfolioHeartRepository.save(portfolioHeart);
    }

    public void unheart(Member member, Portfolio portFolio){
        portFolio.setHeartCount(portFolio.getHeartCount()-1);

        portfolioHeartRepository.delete(portfolioHeartRepository.findByPortFolioAndMember(portFolio,member));
    }

    public boolean isHeartPost(Member member, Portfolio portFolio){
        return portfolioHeartRepository.existsByPortFolioAndMember(portFolio,member);
    }
    public Page<Portfolio> getHeartedPortfoliosByMemberId(Long memberId, Pageable pageable) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new EntityNotFoundException("Member not found");
        }

        return portfolioHeartRepository.findByMember(member, pageable)
                .map(PortfolioHeart::getPortFolio);
    }
    public List<Portfolio> getTop10PortfoliosByHeartsLast7Days() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0,10);
        return portfolioHeartRepository.findTop10PortfoliosByHeartsLast7Days(oneWeekAgo,pageable);
    }

    public List<PortfolioHeart> getHeartByPortfolio(Portfolio portFolio){
        return portfolioHeartRepository.findByPortFolio(portFolio);
    }
}


