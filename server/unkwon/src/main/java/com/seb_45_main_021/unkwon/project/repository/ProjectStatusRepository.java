package com.seb_45_main_021.unkwon.project.repository;

import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectStatusRepository extends JpaRepository<ProjectStatus, Long> {

    // projectId 와, status 로 projectStatus 찾기
    List<ProjectStatus> findByProject_ProjectIdAndStatus_CodeValue(Long projectId, String status);
}
