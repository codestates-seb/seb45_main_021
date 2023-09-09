package com.seb_45_main_021.unkwon.project.service;

import com.seb_45_main_021.unkwon.commonCode.CommonCode;
import com.seb_45_main_021.unkwon.commonCode.CommonCodeRepository;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectApplicationStatusResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.project.repository.ProjectRepository;
import com.seb_45_main_021.unkwon.project.repository.ProjectStatusRepository;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardResponseDto;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
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
        Optional.ofNullable(project.getTags())
                .ifPresent(tags -> findProject.setTags(tags));
        Optional.ofNullable(project.getLang())
                .ifPresent(lang -> findProject.setLang(lang));
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
        findProject.setView(findProject.getView()+1);
        projectRepository.save(findProject);

        // joinPeople 찾기 : '수락됨' 상태의 멤버만 포함
        List<Long> joinPeople = findProject.getProjectStatuses().stream()
                .filter(ps -> "수락됨".equals(ps.getCommonCode().getCodeValue()))
                .map(ps -> ps.getMember().getMemberId())
                .collect(Collectors.toList());

        // requestPeople 찾기: '수락 대기중' 상태의 멤버만 포함
        List<Long> requestPeople = findProject.getProjectStatuses().stream()
                .filter(ps -> "수락 대기중".equals(ps.getCommonCode().getCodeValue()))
                .map(ps -> ps.getMember().getMemberId())
                .collect(Collectors.toList());

        findProject.setJoinPeople(joinPeople);
        findProject.setRequestPeople(requestPeople);

        return findProject;
    }

    // 특정 프로젝트의 지원현황 조회
    public ProjectApplicationStatusResponseDto getApplicationStatus(Long projectId) {
        List<ProjectStatus> acceptedStatuses = projectStatusRepository.findByProject_ProjectIdAndCommonCode_CodeId(projectId, 2L);
        List<ProjectStatus> waitingStatuses = projectStatusRepository.findByProject_ProjectIdAndCommonCode_CodeId(projectId, 1L);

        List<Member> acceptedMembers = acceptedStatuses.stream()
                .map(ProjectStatus::getMember)
                .collect(Collectors.toList());

        List<ProjectCard> waitingCards = waitingStatuses.stream()
                .map(ProjectStatus::getProjectCard)
                .collect(Collectors.toList());

        ProjectApplicationStatusResponseDto response = new ProjectApplicationStatusResponseDto();
        response.setJoinPeople(acceptedMembers.stream().map(member -> new ProjectApplicationStatusResponseDto.JoinPeopleResponseDto(member.getMemberId(), member.getImgUrl(), member.getUsername())).collect(Collectors.toList()));
        response.setRequestPeople(waitingCards.stream().map(projectCard -> new ProjectCardResponseDto(
                projectCard.getProjectCardId(),
                projectCard.getTitle(),
                projectCard.getAboutMe(),
                projectCard.getTell(),
                projectCard.getTag()
        )).collect(Collectors.toList()));

        return response;
    }

    // 프로젝트 조회기능 (언어, 태그, 인기순)
    public Page<Project> findProjects(String[] tags, String[] lang, Pageable pageable){

        if(tags != null && lang != null){
            Arrays.sort(tags);
            Arrays.sort(lang);

            StringBuilder tagsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = "%"+ tags[i] + "%";
                tagsLikeQueryBuilder.append(temp);
            }

            StringBuilder langsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = "%" + lang[i] + "%";
                langsLikeQueryBuilder.append(temp);
            }
            return projectRepository.findByTagsAndLang(tagsLikeQueryBuilder.toString(),langsLikeQueryBuilder.toString(),pageable);
        }
        else if(tags != null){
            Arrays.sort(tags);

            StringBuilder tagLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = "%"+ tags[i] + "%";
                tagLikeQueryBuilder.append(temp);
            }
            return projectRepository.findByTags(tagLikeQueryBuilder.toString(),pageable);
        }
        else if(lang != null){
            Arrays.sort(lang);

            StringBuilder langLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = "%" + lang[i] + "%";
                langLikeQueryBuilder.append(temp);
            }
            return projectRepository.findByLang(langLikeQueryBuilder.toString(),pageable);
        }
        else {
            return projectRepository.findAll(pageable);
        }
    }

    // 프로젝트 삭제
    public void deleteProject(long projectId) {

        Project findProject = findVerifiedProject(projectId);
        projectRepository.delete(findProject);

    }

    // 프로젝트 지원
    public ProjectStatus applyForProject(ProjectStatus projectStatus) {

        Long memberId = projectStatus.getMember().getMemberId();
        Long projectId = projectStatus.getProject().getProjectId();
//        Long projectCardId = projectStatus.getProjectcard().getProjectCardId();

        // 0. 해당 memberId와 projectId 조합으로 이미 존재하는 projectStatus 가 있는지 확인
        Optional<ProjectStatus> existingStatus = projectStatusRepository.findByMember_MemberIdAndProject_ProjectId(memberId, projectId);
        if (existingStatus.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_APPLIED);
        }

        // 1. 지원하는 프로젝트 찾기
        Project project = projectRepository.findById(projectStatus.getProject().getProjectId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));

        // 2. '수락 대기중' 상태코드가 존재하는지 검증
        CommonCode acceptedStatus = commonCodeRepository.findByCodeId(1L)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMON_CODE_NOT_FOUND));

        // 3. '수락 대기중' 상태코드 넣기
        projectStatus.setCommonCode(acceptedStatus);

        // 4. 해당 프로젝트 requestPeople 리스트에 지원자의 memberId를 추가
        List<Long> requestPeople = project.getRequestPeople();
        if (requestPeople == null) {
            requestPeople = new ArrayList<>();
        }
        requestPeople.add(projectStatus.getMember().getMemberId());
        project.setRequestPeople(requestPeople);

        // 5. 변경된 Project 엔터티를 저장
        projectRepository.save(project);

        // 6. 변경된 projectStatus 저장 및 반환
        return projectStatusRepository.save(projectStatus);
    }

    // 프로젝트 지원 취소
    @Transactional
    public void revokeProject(long projectStatusId) {

        ProjectStatus projectStatus = projectStatusRepository.findById(projectStatusId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));

        projectStatusRepository.delete(projectStatus);

        Project project = projectRepository.findById(projectStatus.getProject().getProjectId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));

        // joinPeople 또는 requestPeople 리스트 업데이트
        List<Long> requestPeople = project.getRequestPeople();
        requestPeople.remove(projectStatus.getMember().getMemberId());
        project.setRequestPeople(requestPeople);

        // Project 엔터티 저장
        projectRepository.save(project);
    }

    // 하나의 프로젝트에 대한 projectStatus 조회
    public List<ProjectStatus> findProjectStatus(Long projectId) {

        return projectStatusRepository.findByProject_ProjectId(projectId);
    }

    // 프로젝트 지원 수락
    public void approveProject(Long projectStatusId) {

        // 프로젝트 지원 상태 식별자로 상태 찾기
        ProjectStatus projectStatus = projectStatusRepository.findById(projectStatusId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_STATUS_NOT_FOUND));

        // 변경할 상태코드가 존재하는지 검증
        CommonCode acceptedStatus = commonCodeRepository.findByCodeId(2L)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMON_CODE_NOT_FOUND));

        // 원하는 상태코드로
        projectStatus.setCommonCode(acceptedStatus);

        projectStatusRepository.save(projectStatus);
    }

    // 프로젝트 지원 거절
    public void rejectProject(Long projectStatusId) {

        // 프로젝트 지원 상태 식별자로 상태 찾기
        ProjectStatus projectStatus = projectStatusRepository.findById(projectStatusId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));

        // 변경할 상태코드가 존재하는지 검증
        CommonCode acceptedStatus = commonCodeRepository.findByCodeId(3L)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMON_CODE_NOT_FOUND));

        // 원하는 상태코드로
        projectStatus.setCommonCode(acceptedStatus);

        projectStatusRepository.save(projectStatus);

    }

    // 내가 게시한 프로젝트 목록
    public List<Project> getProjectsPostedBy(Long memberId) {
        return projectRepository.findProjectsByPostedMemberId(memberId);
    }

    // 내가 지원한 프로젝트 목록
    public List<Project> getProjectsAppliedBy(Long memberId) {
        return projectRepository.findProjectsByAppliedMemberId(memberId);
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

//    // 전체 프로젝트 조회
//    public Page<Project> findProjects(int page, int size) {
//
//        return projectRepository.findAll(
//                PageRequest.of(page, size, Sort.by("projectId").descending()));
//    }
//
//    // 태그 검색
//    public Page<Project> findTagProject(int page, int size, String[] tags) { //검색 처리
//
//        Arrays.sort(tags);
//
//        StringBuilder likeQueryBuilder = new StringBuilder("");
//
//        for (int i = 0; i < tags.length; i++) {
//            String temp = "%" + tags[i] + "%";
//            likeQueryBuilder.append(temp);
//        }
//
//        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "created_at"));
//        Page<Project> searchProjectTagList = projectRepository.getSearchProjectList(likeQueryBuilder.toString(), pageRequest);
//
//        System.out.println();
//        return searchProjectTagList;
//    }
//
//    // 언어 검색
//    public Page<Project> findLangProject(int page, int size, String[] lang) { //검색 처리
//
//        Arrays.sort(lang);
//
//        StringBuilder likeQueryBuilder = new StringBuilder("");
//
//        for (int i = 0; i < lang.length; i++) {
//            String temp = "%" + lang[i] + "%";
//            likeQueryBuilder.append(temp);
//        }
//
//        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "created_at"));
//        Page<Project> searchProjectLangList = projectRepository.getSearchProjectList1(likeQueryBuilder.toString(), pageRequest);
//
//        System.out.println();
//        return searchProjectLangList;
//    }
//
//    // '좋아요' 기준 프로젝트 주간 Top10
//    public Page<Project> findWeeklyPopularProjects(Pageable pageRequest) {
//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime oneWeekAgo = now.minus(1, ChronoUnit.WEEKS);
//
//        return projectRepository.findByHeartAtBetween(oneWeekAgo, now, pageRequest);
//    }
//
//    // 프로젝트 '조회수' 기준 정렬
//    public Page<Project> findProjectsView(int page, int size){
//
//        return projectRepository.findAll(
//                PageRequest.of(page, size, Sort.by("view").descending()));
//    }

}
