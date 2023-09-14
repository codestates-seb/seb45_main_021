package com.seb_45_main_021.unkwon.heart.repository;

import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ProjectHeartRepository extends JpaRepository<ProjectHeart, Long> {

    ProjectHeart findByProjectAndMember(Project project, Member member);

    Page<ProjectHeart> findByMember(Member member, Pageable pageable);

    boolean existsByProjectAndMember(Project project, Member member);

    List<ProjectHeart> findByProject(Project project);

    @Query("SELECT p.project FROM ProjectHeart p WHERE p.createdAt >= :oneWeekAgo GROUP BY p.project ORDER BY COUNT(p.project) DESC ")
    List<Project> findTop10ProjectsByHeartsLast7Days(@Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable pageable);

    List<ProjectHeart> findByMember(Member member);
}
