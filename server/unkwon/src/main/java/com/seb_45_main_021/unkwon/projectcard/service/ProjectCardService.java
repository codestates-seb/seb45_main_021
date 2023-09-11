package com.seb_45_main_021.unkwon.projectcard.service;

import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.projectcard.dto.request.ProjectCardPatchDto;
import com.seb_45_main_021.unkwon.projectcard.dto.request.ProjectCardPostDto;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import com.seb_45_main_021.unkwon.projectcard.repository.ProjectCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectCardService {
    private final ProjectCardRepository projectCardRepository;
    private final MemberService memberService;
    private static final int MAX_COUNT = 3;

    public void postProjectCard(ProjectCardPostDto dto){
        // 회원 존재 확인
        Member findMember = memberService.findVerifiedMember(dto.getMemberId());

        if(findMember.getProjectCardList().size() == MAX_COUNT){
            throw new BusinessLogicException(ExceptionCode.CARD_LIMIT_OVER);
        }

        ProjectCard projectCard = new ProjectCard(dto.getTell(), dto.getAboutMe(), findMember, dto.getTags());
        findMember.setProjectCardList(projectCard);

        projectCardRepository.save(projectCard);
    }

    public List<ProjectCard> getProjectCards(Long memberId){
        Member findMember = memberService.findVerifiedMember(memberId);

        return findMember.getProjectCardList();
    }

    public void updateProjectCard(ProjectCardPatchDto dto){
        ProjectCard projectCard = findVerifiedProjectCard(dto.getProjectCardId());

        Optional.ofNullable(dto.getTell())
                .ifPresent(tell -> projectCard.setTell(dto.getTell()));

        Optional.ofNullable(dto.getAboutMe())
                .ifPresent(aboutMe -> projectCard.setAboutMe(dto.getAboutMe()));

        Optional.ofNullable(dto.getTags())
                .ifPresent(tags -> projectCard.setTag(tags));

        projectCardRepository.save(projectCard);
    }

    public void removeProjectCard(Long projectCardId){
        ProjectCard findProjectCard = findVerifiedProjectCard(projectCardId);

        projectCardRepository.delete(findProjectCard);
    }

    private ProjectCard findVerifiedProjectCard(Long projectCardId){
        return projectCardRepository.findById(projectCardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

}
