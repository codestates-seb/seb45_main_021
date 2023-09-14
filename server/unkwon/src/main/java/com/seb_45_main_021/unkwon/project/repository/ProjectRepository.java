package com.seb_45_main_021.unkwon.project.repository;

import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
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
            value = "SELECT * FROM PROJECT AS p WHERE p.tagA LIKE :tagLikeQuery OR p.tagB LIKE :tagLikeQuery OR p.tagC LIKE :tagLikeQuery",
            countQuery = "SELECT COUNT(*) FROM PROJECT AS p WHERE p.tagA LIKE :tagLikeQuery OR p.tagB LIKE :tagLikeQuery OR p.tagC LIKE :tagLikeQuery",
            nativeQuery = true)
    Page<Project> findByTags(String tagLikeQuery, Pageable pageable);
    @Query(
            value = "SELECT * FROM PROJECT AS p WHERE p.lang LIKE :langLikeQuery",
            countQuery = "SELECT COUNT(*) FROM PROJECT AS p WHERE p.lang LIKE :langLikeQuery",
            nativeQuery = true)
    Page<Project> findByLang(String langLikeQuery,Pageable pageable);
    @Query(value = "SELECT * FROM PROJECT AS p WHERE p.tagA LIKE :tagLikeQuery OR p.tagB LIKE :tagLikeQuery OR p.tagC LIKE :tagLikeQuery AND p.lang LIKE :langLikeQuery",
            countQuery = "SELECT COUNT(*) FROM PROJECT AS p WHERE p.tagA LIKE :tagLikeQuery OR p.tagB LIKE :tagLikeQuery OR p.tagC LIKE :tagLikeQuery AND p.lang LIKE :langsLike",
            nativeQuery = true)
    Page<Project> findByTagsAndLang(String tagLikeQuery, String langLikeQuery,Pageable pageable);

}
