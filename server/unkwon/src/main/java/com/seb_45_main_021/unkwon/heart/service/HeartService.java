package com.seb_45_main_021.unkwon.heart.service;

import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.heart.dto.HeartDto;
import com.seb_45_main_021.unkwon.heart.entity.Heart;
import com.seb_45_main_021.unkwon.heart.repository.HeartRepository;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.portfolio.repository.PortFolioRepository;
import com.seb_45_main_021.unkwon.portfolio.service.PortFolioService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class HeartService {

    private final HeartRepository heartRepository;
    private final MemberRepository memberRepository;


    public Heart heart(Member member, PortFolio portFolio){
        Heart heart = new Heart(true,member,portFolio);

        heart.setCreatedAt(new Date());

        portFolio.setHeartCount(portFolio.getHeartCount()+1);
        return heartRepository.save(heart);
    }

    public void unheart(Member member, PortFolio portFolio){
        portFolio.setHeartCount(portFolio.getHeartCount()-1);

        heartRepository.delete(heartRepository.findByPortFolioAndMember(portFolio,member));
    }

    public boolean isHeartPost(Member member, PortFolio portFolio){
        return heartRepository.existsByPortFolioAndMember(portFolio,member);
    }
    public Page<PortFolio> getHeartedPortfoliosByMemberId(Long memberId, Pageable pageable) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new EntityNotFoundException("Member not found");
        }

        return heartRepository.findByMember(member, pageable)
                .map(Heart::getPortFolio);
    }


}


