package com.seb_45_main_021.unkwon.heart.service;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.heart.repository.PortfolioHeartRepository;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PortfolioHeartService {

    private final PortfolioHeartRepository portfolioHeartRepository;
    private final MemberRepository memberRepository;


    public PortfolioHeart heart(Member member, PortFolio portFolio){
        PortfolioHeart portfolioHeart = new PortfolioHeart(true,member,portFolio);

        portfolioHeart.setCreatedAt(new Date());

        portFolio.setHeartCount(portFolio.getHeartCount()+1);
        return portfolioHeartRepository.save(portfolioHeart);
    }

    public void unheart(Member member, PortFolio portFolio){
        portFolio.setHeartCount(portFolio.getHeartCount()-1);

        portfolioHeartRepository.delete(portfolioHeartRepository.findByPortFolioAndMember(portFolio,member));
    }

    public boolean isHeartPost(Member member, PortFolio portFolio){
        return portfolioHeartRepository.existsByPortFolioAndMember(portFolio,member);
    }
    public Page<PortFolio> getHeartedPortfoliosByMemberId(Long memberId, Pageable pageable) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new EntityNotFoundException("Member not found");
        }

        return portfolioHeartRepository.findByMember(member, pageable)
                .map(PortfolioHeart::getPortFolio);
    }

    public List<PortfolioHeart> getHeartByPortfolio(PortFolio portFolio){
        return portfolioHeartRepository.findByPortFolio(portFolio);
    }
<<<<<<< HEAD
}
=======
}


>>>>>>> serverDev
