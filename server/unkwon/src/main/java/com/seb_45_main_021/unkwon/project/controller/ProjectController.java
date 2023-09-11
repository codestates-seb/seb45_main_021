package com.seb_45_main_021.unkwon.project.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.project.dto.request.ProjectPatchDto;
import com.seb_45_main_021.unkwon.project.dto.request.ProjectPostDto;
import com.seb_45_main_021.unkwon.project.dto.request.ProjectRequestDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectApplicationStatusResponseDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectResponseDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectStatusResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.project.mapper.ProjectMapper;
import com.seb_45_main_021.unkwon.project.service.ProjectService;
import com.seb_45_main_021.unkwon.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
@Validated
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectMapper mapper;

    private final String PROJECT_DEFAULT_URL = "/projects";

    public ProjectController(ProjectService projectService,
                             ProjectMapper mapper) {
        this.projectService = projectService;
        this.mapper = mapper;
    }

    // 프로젝트 등록
    @PostMapping
    public ResponseEntity postProject(@RequestBody @Valid ProjectPostDto projectPostDto) {

        Project project = projectService.createProject(mapper.projectPostDtoToProject(projectPostDto));

        URI location = UriCreator.createUri(PROJECT_DEFAULT_URL, project.getProjectId());

        return ResponseEntity.created(location).body(mapper.projectToProjectResponseDto(project));

    }

    // 프로젝트 수정
    @PatchMapping("/{project-id}")
    public ResponseEntity patchProject(@PathVariable("project-id") @Positive long projectId,
                                       @RequestBody ProjectPatchDto projectPatchDto) {

        projectPatchDto.setProjectId(projectId);

        Project project = projectService.updateProject(mapper.projectPatchDtoToProject(projectPatchDto));

        return new ResponseEntity<>(mapper.projectToProjectResponseDto(project), HttpStatus.OK);

    }

    // 프로젝트 상세 조회
    @GetMapping("/{project-id}")
    public ResponseEntity getProject(@PathVariable("project-id") @Positive long projectId) {

        Project project = projectService.findProject(projectId);

        return new ResponseEntity<>(mapper.projectToProjectResponseDto(project), HttpStatus.OK);

    }

    // 프로젝트 검색
    @GetMapping("/search")
    public ResponseEntity searchProjects(@RequestParam(required = false)String[] tags,
                                           @RequestParam(required = false)String[] lang,
                                           @PageableDefault(size = 12,sort = "projectId",direction = Sort.Direction.DESC)Pageable pageable
    ){

        Page<Project> result = projectService.findProjects(tags, lang, pageable);

        List<ProjectResponseDto> projectResponseDtos = mapper.projectsToProjectResponseDtos(result.getContent());

        return new ResponseEntity<>(
                new MultiResponseDto<>(projectResponseDtos,result),HttpStatus.OK);

    }

    // 프로젝트 삭제
    @DeleteMapping("/{project-id}")
    public ResponseEntity deleteProject(@PathVariable("project-id")@Positive long projectId) {

        projectService.deleteProject(projectId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    // 프로젝트 지원
    @PostMapping("/request")
    public ResponseEntity requestProject(@RequestBody ProjectRequestDto projectRequestDto) {

        ProjectStatus projectStatus = projectService.applyForProject(mapper.projectRequestDtoToProjectStatus(projectRequestDto));

        URI location = UriCreator.createUri(PROJECT_DEFAULT_URL, projectStatus.getProjectStatusId());

        return ResponseEntity.created(location).build();
    }

    // 프로젝트 지원 취소
    @DeleteMapping("cancel/{projectStatus-id}")
    public ResponseEntity cancelProject(@PathVariable("projectStatus-id") @Positive long projectStatusId) {

        projectService.revokeProject(projectStatusId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 프로젝트 지원 수락
    @PatchMapping("/request/{projectStatusId}/accept")
    public ResponseEntity acceptProject(@PathVariable Long projectStatusId) {

        projectService.approveProject(projectStatusId);

        return ResponseEntity.ok().build();
    }

    // 프로젝트 지원 거절
    @PatchMapping("/request/{projectStatusId}/refuse")
    public ResponseEntity refuseProject(@PathVariable Long projectStatusId) {

        projectService.rejectProject(projectStatusId);

        return ResponseEntity.ok().build();

    }

    // 하나의 프로젝트에 대한 projectStatus 조회
    @GetMapping("/{projectId}/request")
    public ResponseEntity getRequestPeoples(@PathVariable long projectId) {

        // projectStatus(project, member, commonCode) 목록 가져오기
        List<ProjectStatus> requestPeoples = projectService.findProjectStatus(projectId);

        // 가져온 projectStatus 에서 ProjectRequestResponseDto 구성하기
        List<ProjectStatusResponseDto> response = requestPeoples.stream()
                .map(mapper::projectStatusToProjectStatusResponseDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    // 특정 프로젝트의 지원현황 조회
    @GetMapping("/{projectId}/application-status")
    public ResponseEntity<ProjectApplicationStatusResponseDto> getApplicationStatus(@PathVariable Long projectId) {

        ProjectApplicationStatusResponseDto response = projectService.getApplicationStatus(projectId);

        return ResponseEntity.ok(response);
    }


    // 내가 게시한 프로젝트 목록
    @GetMapping("/postedBy/{memberId}")
    public ResponseEntity getProjectsPostedBy(@PathVariable Long memberId) {

        List<Project> project = projectService.getProjectsPostedBy(memberId);

        return ResponseEntity.ok(mapper.projectsToProjectResponseDtos(project));
    }

    // 내가 지원한 프로젝트 목록
    @GetMapping("/appliedBy/{memberId}")
    public ResponseEntity getProjectsAppliedBy(@PathVariable Long memberId) {

        List<Project> project = projectService.getProjectsAppliedBy(memberId);

        return ResponseEntity.ok(mapper.projectsToProjectResponseDtos(project));
    }


//    // 프로젝트 전체 조회
//    @GetMapping
//    public ResponseEntity getProjects(@RequestParam(required = false, defaultValue = "1") int page,
//                                      @RequestParam(required = false, defaultValue = "12") int size) {
//
//        Page<Project> pageProjects = projectService.findProjects(page-1,size);
//        List<Project> projects = pageProjects.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.projectsToProjectResponseDtos(projects), pageProjects),HttpStatus.OK);
//
//    }
//
//    // 태그 검색 조회
//    @GetMapping("/tagSearch")
//    public ResponseEntity getProjectsTag(@RequestParam(required = false, defaultValue = "1") int page,
//                                           @RequestParam(required = false, defaultValue = "12") int size,
//                                           @RequestParam("tag") String[] tag ){
//        Page<Project> resultSearchTags = projectService.findTagProject(page,size,tag);
//        List<ProjectResponseDto> projectResponseDtoList = mapper.projectsToProjectResponseDtos(resultSearchTags.getContent());
//
//        return new ResponseEntity(
//                new MultiResponseDto<>(projectResponseDtoList, resultSearchTags),HttpStatus.OK);
//    }
//
//    // 언어 검색 조회
//    @GetMapping("/langSearch")
//    public ResponseEntity getProjectsLang(@RequestParam(required = false, defaultValue = "1") int page,
//                                            @RequestParam(required = false, defaultValue = "12") int size,
//                                            @RequestParam("lang") String[] lang ){
//        Page<Project> resultSearchLang = projectService.findLangProject(page,size,lang);
//        List<ProjectResponseDto> projectResponseDtoList = mapper.projectsToProjectResponseDtos(resultSearchLang.getContent());
//
//        return new ResponseEntity(
//                new MultiResponseDto<>(projectResponseDtoList, resultSearchLang),HttpStatus.OK);
//    }

//    // 프로젝트 주간 Top10
//    @GetMapping("/weekly-popular")
//    public ResponseEntity<Page<Project>> getWeeklyPopularProjects(
//            @RequestParam(required = false, defaultValue = "1") int page,
//            @RequestParam(required = false, defaultValue = "10") int size) {
//
//        Pageable pageRequest = PageRequest.of(page - 1, size);
//        Page<Project> popularProjects = projectService.findWeeklyPopularProjects(pageRequest);
//        List<ProjectResponseDto> projectResponseDtoList = mapper.projectsToProjectResponseDtos(popularProjects.getContent());
//
//        return new ResponseEntity(
//                new MultiResponseDto<>(projectResponseDtoList,popularProjects),HttpStatus.OK);
//    }
//
//    // 프로젝트 View 정렬 조회
//    @GetMapping("/view")
//    public ResponseEntity getPortfoliosView(@RequestParam(required = false, defaultValue = "1") int page,
//                                            @RequestParam(required = false, defaultValue = "12") int size){
//        Page<Project> pageProjects = projectService.findProjectsView(page-1,size);
//        List<Project> projects = pageProjects.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.projectsToProjectResponseDtos(projects), pageProjects),HttpStatus.OK);
//    }

}
