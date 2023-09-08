package com.seb_45_main_021.unkwon.project.repository;

import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectStatusRepository extends JpaRepository<ProjectStatus, Long> {

    List<ProjectStatus> findByProject_ProjectIdAndCommonCode_CodeValue(Long projectId, String codeValue);

    List<ProjectStatus> findByProject_ProjectId(Long projectId);

    List<ProjectStatus> findByMember(Member member);
}
