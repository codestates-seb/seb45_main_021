package com.seb_45_main_021.unkwon.project.service;

import com.seb_45_main_021.unkwon.commonCode.CommonCode;
import com.seb_45_main_021.unkwon.commonCode.CommonCodeRepository;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.project.repository.ProjectRepository;
import com.seb_45_main_021.unkwon.project.repository.ProjectStatusRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;
    private ProjectStatusRepository projectStatusRepository;
    private CommonCodeRepository commonCodeRepository;

    private MemberRepository memberRepository;

    public ProjectService(ProjectRepository projectRepository,
                          ProjectStatusRepository projectStatusRepository,
                          CommonCodeRepository commonCodeRepository,
                          MemberRepository memberRepository) {
        this.projectRepository = projectRepository;
        this.projectStatusRepository = projectStatusRepository;
        this.commonCodeRepository = commonCodeRepository;
        this.memberRepository = memberRepository;
    }

    // 프로젝트 등록
    public Project createProject(Project project) {

        return projectRepository.save(project);
    }

    // 프로젝트 수정
    public Project updateProject(Project project) {

        // 해당 프로젝트의 Id 로 존재하는 프로젝트인지 검증
        Project findProject = findVerifiedProject(project.getProjectId());

        // 수정된 정보 업데이트
        Optional.ofNullable(project.getTitle())
                .ifPresent(title -> findProject.setTitle(title));
        Optional.ofNullable(project.getTotalPeople())
                .ifPresent(totalPeople -> findProject.setTotalPeople(totalPeople));
        Optional.ofNullable(project.getLanguage())
                .ifPresent(language -> findProject.setLanguage(language));
        Optional.ofNullable(project.getBody())
                .ifPresent(body -> findProject.setBody(body));
        Optional.ofNullable(project.getDescription())
                .ifPresent(description -> findProject.setDescription(description));

        // 수정된 정보 DB 반영
        return projectRepository.save(findProject);

    }

    // 특정 프로젝트 조회
    public Project findProject(long projectId) {
        Project findProject = findVerifiedProject(projectId);

        List<ProjectStatus> projectStatuses = projectStatusRepository.findByProject_ProjectIdAndStatus_CodeValue(projectId, "수락 대기중");

        List<Long> requestPeople = projectStatuses.stream()
                .map(status -> status.getMember().getMemberId())
                .collect(Collectors.toList());

        findProject.setRequestPeople(requestPeople);

        return findVerifiedProject(projectId);
    }

    // 전체 프로젝트 조회
    public Page<Project> findProjects(int page, int size) {

        return projectRepository.findAll(
                PageRequest.of(page, size, Sort.by("projectId").descending()));
    }

    // 프로젝트 삭제
    public void deleteProject(long projectId) {

        Project findProject = findVerifiedProject(projectId);
        projectRepository.delete(findProject);

    }

    // 프로젝트 지원
    public ProjectStatus applyForProject(ProjectStatus projectStatus) {

        return projectStatusRepository.save(projectStatus);
    }


    // 존재하는 프로젝트인지 검증
    public Project findVerifiedProject(long projectId) {

        // 프로젝트 검색
        Optional<Project> optionalProject =
                projectRepository.findByProjectId(projectId);

        // 있으면 그 값을 findProject 에 할당, 없으면 람다식 예외처리
        Project findProject =
                optionalProject.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));

        // 할당된 값 반환
        return findProject;
    }

    // 존재하는 유저인지 확인
    public Member findVerifiedMember(long memberId) {

        // 프로젝트 검색
        Optional<Member> optionalMember =
                memberRepository.findByMemberId(memberId);

        // 있으면 그 값을 findProject 에 할당, 없으면 람다식 예외처리
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 할당된 값 반환
        return findMember;
    }

}
