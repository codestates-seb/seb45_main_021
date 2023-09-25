package com.seb_45_main_021.unkwon.project.repository;

import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectStatusRepository extends JpaRepository<ProjectStatus, Long> {

    List<ProjectStatus> findByProject_ProjectIdAndCommonCode_CodeValue(Long projectId, String codeValue);

    List<ProjectStatus> findByProject_ProjectId(Long projectId);

    List<ProjectStatus> findByMember(Member member);

    Optional<ProjectStatus> findByMember_MemberIdAndProject_ProjectId(Long memberId, Long projectId);

    List<ProjectStatus> findByProject_ProjectIdAndCommonCode_CodeId(Long projectId, Long codeId);
}
