package com.seb_45_main_021.unkwon.heart.service;

import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.heart.repository.ProjectHeartRepository;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.project.entity.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectHeartService {

    private final ProjectHeartRepository projectHeartRepository;
    private final MemberRepository memberRepository;


    public ProjectHeart heart(Member member, Project project){
        ProjectHeart projectHeart = new ProjectHeart(true,member,project);

        projectHeart.setCreatedAt(new Date());

        project.setHeartCount(project.getHeartCount()+1);
        return projectHeartRepository.save(projectHeart);
    }

    public void unheart(Member member, Project project){
        project.setHeartCount(project.getHeartCount()-1);

        projectHeartRepository.delete(projectHeartRepository.findByProjectAndMember(project,member));
    }

    public boolean isHeartPost(Member member, Project project){
        return projectHeartRepository.existsByProjectAndMember(project,member);
    }
    public Page<Project> getHeartedProjectsByMemberId(Long memberId, Pageable pageable) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new EntityNotFoundException("Member not found");
        }

        return projectHeartRepository.findByMember(member, pageable)
                .map(ProjectHeart::getProject);
    }

    public List<ProjectHeart> getHeartByPortfolio(Project project){
        return projectHeartRepository.findByProject(project);
    }
}
