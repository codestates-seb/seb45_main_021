package com.seb_45_main_021.unkwon.project.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectPatchDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectPostDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectRequestDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.project.mapper.ProjectMapper;
import com.seb_45_main_021.unkwon.project.service.ProjectService;
import com.seb_45_main_021.unkwon.utils.UriCreator;
import org.springframework.data.domain.Page;
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

    // 프로젝트 1개 조회
    @GetMapping("/{project-id}")
    public ResponseEntity getProject(@PathVariable("project-id") @Positive long projectId) {

        Project project = projectService.findProject(projectId);

        return new ResponseEntity<>(mapper.projectToProjectResponseDto(project), HttpStatus.OK);

    }

    // 프로젝트 전체 조회
    @GetMapping
    public ResponseEntity getProjects(@RequestParam(required = false, defaultValue = "1") int page,
                                      @RequestParam(required = false, defaultValue = "12") int size) {

        Page<Project> pageProjects = projectService.findProjects(page-1,size);
        List<Project> projects = pageProjects.getContent();
//        List<ProjectResponseDto> response = projectList.stream()
//                .map(mapper::projectToProjectResponseDto)
//                .collect(Collectors.toList());

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.projectsToProjectResponseDtos(projects), pageProjects),HttpStatus.OK);

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

    // 하나의 프로젝트에 대한 지원현황 조회
    @GetMapping("/{projectId}/request")
    public ResponseEntity getRequestPeoples(@PathVariable long projectId) {

        List<ProjectStatus> requestPeoples = projectService.findProjectStatus(projectId);
        List<ProjectRequestDto> response = requestPeoples.stream()
                .map(mapper::projectStatusToprojectRequestDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);

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

}
