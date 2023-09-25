package unkwon.project.service;

import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.commonCode.CommonCode;
import com.seb_45_main_021.unkwon.commonCode.CommonCodeRepository;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.image.*;
import com.seb_45_main_021.unkwon.image.project.ProjectImage;
import com.seb_45_main_021.unkwon.image.project.ProjectImageRepository;
import com.seb_45_main_021.unkwon.image.project.ProjectTitleImage;
import com.seb_45_main_021.unkwon.image.project.ProjectTitleImageRepository;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectApplicationStatusResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.project.repository.ProjectRepository;
import com.seb_45_main_021.unkwon.project.repository.ProjectStatusRepository;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardApplyResponseDto;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private ProjectTitleImageRepository projectTitleImageRepository;
    private ProjectImageRepository projectImageRepository;
    @Autowired
    private S3Service s3Service;

    public ProjectService(ProjectRepository projectRepository,
                          ProjectStatusRepository projectStatusRepository,
                          ProjectTitleImageRepository projectTitleImageRepository,
                          CommonCodeRepository commonCodeRepository,
                          MemberRepository memberRepository,
                          ProjectImageRepository projectImageRepository) {
        this.projectRepository = projectRepository;
        this.projectTitleImageRepository = projectTitleImageRepository;
        this.projectStatusRepository = projectStatusRepository;
        this.commonCodeRepository = commonCodeRepository;
        this.memberRepository = memberRepository;
        this.projectImageRepository = projectImageRepository;
    }

    // 프로젝트 등록
    public Project createProject(Project project, MultipartFile titleImageFile, List<MultipartFile> imageFiles) {
        String bucketName = s3Service.getBucketName();

        // 타이틀 이미지 로직
        String titleFileName = s3Service.uploadFile(titleImageFile); // S3 업로드
        String titleImageUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, titleFileName); // URL 생성
        ProjectTitleImage titleImage = new ProjectTitleImage(); // 타이틀 이미지 객체 생성
        titleImage.setImageUrl(titleImageUrl); // URL 저장
        project.setProjectTitleImage(titleImage); // 프로젝트에 반영

        // 나머지 이미지 로직
        if (imageFiles != null && !imageFiles.isEmpty()) {
            for (MultipartFile imageFile : imageFiles) { // 배열로 받은 이미지 순회
                String fileName = s3Service.uploadFile(imageFile); // S3 업로드
                String imageUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName); // URL 생성

                ProjectImage image = new ProjectImage(); // 이미지 객체 생성
                image.setImageUrl(imageUrl); // URL 저장
                project.addImage(image); // 프로젝트에 반영
            }
        }

        return projectRepository.save(project);
    }

    // 프로젝트 수정
    @Transactional
    public Project updateProject(Project project,
                                 MultipartFile titleImageFile, String titleImageUrl,
                                 List<MultipartFile> imageFiles, List<String> imageUrls,
                                 MemberInfo memberInfo) {

        // 해당 프로젝트의 Id 로 존재하는 프로젝트인지 검증
        Project findProject = findVerifiedProject(project.getProjectId());

        // 작성자와 수정자 memberId 일치 검증
        Member findMember = findProject.getMember();
        findMember.checkMemberId(memberInfo);

        // 수정된 정보 업데이트
        Optional.ofNullable(project.getTitle())
                .ifPresent(title -> findProject.setTitle(title));
        Optional.ofNullable(project.getTotalPeople())
                .ifPresent(totalPeople -> findProject.setTotalPeople(totalPeople));
        findProject.setTagA(project.getTagA());
        findProject.setTagB(project.getTagB());
        findProject.setTagC(project.getTagC());
        Optional.ofNullable(project.getLang())
                .ifPresent(lang -> findProject.setLang(lang));
        Optional.ofNullable(project.getBody())
                .ifPresent(body -> findProject.setBody(body));
        Optional.ofNullable(project.getDescription())
                .ifPresent(description -> findProject.setDescription(description));

        // 타이틀 이미지 삭제
        if(titleImageUrl != null) { // 타이틀 이미지 URL 을 받았다면
            s3Service.deleteFile(titleImageUrl);  // S3 에서 삭제
            projectTitleImageRepository.deleteByImageUrl(titleImageUrl); // DB 에서 삭제
        }
        // 타이틀 이미지 추가
        if(titleImageFile != null && !titleImageFile.isEmpty()) { // 타이틀 이미지 파일을 받았다면
            String titleFileName = s3Service.uploadFile(titleImageFile); // S3 업로드
            String newTitleImageUrl = String.format("https://%s.s3.amazonaws.com/%s", s3Service.getBucketName(), titleFileName); // URL 생성
            ProjectTitleImage titleImage = new ProjectTitleImage(); // 새 ProjectTitleImage 객체 생성
            titleImage.setImageUrl(newTitleImageUrl); // imageUrl 저장
            findProject.setProjectTitleImage(titleImage); // 프로젝트에 ProjectTitleImage 객체 저장
        }
        // 삭제 이미지 URL 배열을 받았다면
        if(imageUrls != null && !imageUrls.isEmpty()) {
            for(String imageUrl : imageUrls) { // for 문 돌려서 하나씩
                s3Service.deleteFile(imageUrl);  // S3 에서 삭제하기
                projectImageRepository.deleteByImageUrl(imageUrl); // DB 에서 삭제
//                findProject.getImages().removeIf(image -> (image.getImageUrl().equals(imageUrl))); // 프로젝트에서도 삭제
            }
        }
        // 나머지 이미지 업데이트 로직
        if(imageFiles != null && !imageFiles.isEmpty()) { // 이미지 파일 배열을 받았다면
            for (MultipartFile imageFile : imageFiles) { // for 문 돌려서 하나씩
                String fileName = s3Service.uploadFile(imageFile); // S3 에 저장
                String imageUrl = String.format("https://%s.s3.amazonaws.com/%s", s3Service.getBucketName(), fileName); // URL 생성

                ProjectImage image = new ProjectImage(); // 새 ProjectImage 객체 생성
                image.setImageUrl(imageUrl); // imageUrl 저장
                findProject.addImage(image); // 프로젝트에 ProjectImage 객체 저장
            }
        }

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
        response.setJoinPeople(acceptedMembers.stream().map(member -> new ProjectApplicationStatusResponseDto.JoinPeopleResponseDto(member.getMemberId(), member.getUserImgUrl(), member.getUserName())).collect(Collectors.toList()));
        response.setRequestPeople(waitingCards.stream().map(projectCard -> new ProjectCardApplyResponseDto(
                projectCard.getProjectCardId(),
                projectCard.getAboutMe(),
                projectCard.getTell(),
                projectCard.getTag(),
                projectCard.getMember()
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
                String temp = tags[i];
                tagsLikeQueryBuilder.append(temp);
            }

            StringBuilder langsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = lang[i];
                langsLikeQueryBuilder.append(temp);
            }
            return projectRepository.findByTagsAndLang(tagsLikeQueryBuilder.toString(),langsLikeQueryBuilder.toString(),pageable);
        }
        else if(tags != null){
            Arrays.sort(tags);

            StringBuilder tagLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = tags[i];
                tagLikeQueryBuilder.append(temp);
            }
            return projectRepository.findByTags(tagLikeQueryBuilder.toString(),pageable);
        }
        else if(lang != null){
            Arrays.sort(lang);

            StringBuilder langLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = lang[i];
                langLikeQueryBuilder.append(temp);
            }
            return projectRepository.findByLang(langLikeQueryBuilder.toString(),pageable);
        }
        else {
            return projectRepository.findAll(pageable);
        }
    }

    // 프로젝트 삭제
    public void deleteProject(long projectId, MemberInfo memberInfo) {

        Project findProject = findVerifiedProject(projectId);

        Member findMember = findProject.getMember();
        findMember.checkMemberId(memberInfo);

        projectRepository.delete(findProject);

    }

    // 프로젝트 지원
    public ProjectStatus applyForProject(ProjectStatus projectStatus) {

        Long memberId = projectStatus.getMember().getMemberId();
        Long projectId = projectStatus.getProject().getProjectId();

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
    public void revokeProject(long projectId, long memberId) {

        ProjectStatus projectStatus = projectStatusRepository.findByMember_MemberIdAndProject_ProjectId(memberId, projectId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_STATUS_NOT_FOUND));

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
    public void approveProject(long projectId, long memberId) {

        // 프로젝트 지원 상태 식별자로 상태 찾기
        ProjectStatus projectStatus = projectStatusRepository.findByMember_MemberIdAndProject_ProjectId(memberId, projectId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_STATUS_NOT_FOUND));

        // 변경할 상태코드가 존재하는지 검증
        CommonCode acceptedStatus = commonCodeRepository.findByCodeId(2L)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMON_CODE_NOT_FOUND));

        // 원하는 상태코드로
        projectStatus.setCommonCode(acceptedStatus);

        projectStatusRepository.save(projectStatus);
    }

    // 프로젝트 지원 거절
    public void rejectProject(long projectId, long memberId) {

        // 프로젝트 지원 상태 식별자로 상태 찾기
        ProjectStatus projectStatus = projectStatusRepository.findByMember_MemberIdAndProject_ProjectId(memberId, projectId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_STATUS_NOT_FOUND));

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
}
