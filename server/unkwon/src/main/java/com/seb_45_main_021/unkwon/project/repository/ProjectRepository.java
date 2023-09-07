package com.seb_45_main_021.unkwon.project.repository;

import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByProjectId(Long projectId); // project 엔티티의 projectId 로 DB 에서 프로젝트 검색

    @Query("SELECT p FROM Project p WHERE p.member.memberId = :memberId")
    List<Project> findProjectsByPostedMemberId(Long memberId);

    @Query("SELECT p FROM Project p, ProjectStatus ps WHERE ps.member.memberId = :memberId AND ps.project = p")
    List<Project> findProjectsByAppliedMemberId(Long memberId);

    @Query(
            value = "SELECT * FROM PROJECT AS p WHERE p.tags LIKE :likeQuery",
            countQuery = "SELECT COUNT(*) FROM PROJECT AS p WHERE p.tags LIKE :likeQuery",
            nativeQuery = true)
    Page<Project> getSearchProjectList(String likeQuery, Pageable pageable);

    @Query(
            value = "SELECT * FROM PROJECT AS p WHERE p.lang LIKE :likeQuery",
            countQuery = "SELECT COUNT(*) FROM PROJECT AS p WHERE p.lang LIKE :likeQuery",
            nativeQuery = true)
    Page<Project> getSearchProjectList1(String likeQuery, Pageable pageable);
    @Query("SELECT p FROM Project p WHERE p.heartAt BETWEEN :startDate AND :endDate ORDER BY p.heartCount DESC")
    Page<Project> findByHeartAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

}
