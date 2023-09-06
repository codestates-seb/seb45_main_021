package com.seb_45_main_021.unkwon.project.repository;

import com.seb_45_main_021.unkwon.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByProjectId(Long projectId); // project 엔티티의 projectId 로 DB 에서 프로젝트 검색

}
