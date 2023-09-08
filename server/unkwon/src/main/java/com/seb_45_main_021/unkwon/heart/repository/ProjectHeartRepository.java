package com.seb_45_main_021.unkwon.heart.repository;

import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectHeartRepository extends JpaRepository<ProjectHeart, Long> {

    ProjectHeart findByProjectAndMember(Project project, Member member);

    Page<ProjectHeart> findByMember(Member member, Pageable pageable);

    List<ProjectHeart> findByMember(Member member);

    boolean existsByProjectAndMember(Project project, Member member);

    List<ProjectHeart> findByProject(Project project);
}
