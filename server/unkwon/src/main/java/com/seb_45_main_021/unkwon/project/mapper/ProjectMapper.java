package com.seb_45_main_021.unkwon.project.mapper;

import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.project.dto.request.ProjectPatchDto;
import com.seb_45_main_021.unkwon.project.dto.request.ProjectPostDto;
import com.seb_45_main_021.unkwon.project.dto.request.ProjectRequestDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectProfileResponseDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectResponseDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectStatusResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    default Project projectPostDtoToProject(ProjectPostDto projectPostDto) {
        Project project = new Project();

        Member member = new Member();
        member.setMemberId(projectPostDto.getMemberId());
        project.setMember(member);


        project.setTitle(projectPostDto.getTitle());
        project.setTotalPeople(projectPostDto.getTotalPeople());
        project.setLang(projectPostDto.getLang());
        project.setTags(projectPostDto.getTags());
        project.setBody(projectPostDto.getBody());
        project.setDescription(projectPostDto.getDescription());
//        project.setClosedAt(projectPostDto.getClosedAt());

        return project;
    }

    default Project projectPatchDtoToProject(ProjectPatchDto projectPatchDto) {
        Project project = new Project();

        project.setProjectId(projectPatchDto.getProjectId());
        project.setTitle(projectPatchDto.getTitle());
        project.setTotalPeople(projectPatchDto.getTotalPeople());
        project.setLang(projectPatchDto.getLang());
        project.setTags(projectPatchDto.getTags());
        project.setBody(projectPatchDto.getBody());
        project.setDescription(projectPatchDto.getDescription());

        return project;
    }
    default ProjectStatus projectRequestDtoToProjectStatus(ProjectRequestDto projectRequestDto) {

        ProjectStatus projectStatus = new ProjectStatus();

        Project project = new Project();
        project.setProjectId(projectRequestDto.getProjectId());
        projectStatus.setProject(project);

        Member member = new Member();
        member.setMemberId(projectRequestDto.getMemberId());
        projectStatus.setMember(member);

        ProjectCard projectCard = new ProjectCard();
        projectCard.setProjectCardId((projectRequestDto.getProjectCardId()));
        projectStatus.setProjectCard(projectCard);

        return projectStatus;
    }

    default ProjectStatusResponseDto projectStatusToProjectStatusResponseDto(ProjectStatus projectStatus) {
        ProjectStatusResponseDto projectRequestResponseDto = new ProjectStatusResponseDto();

        if (projectStatus.getProject() != null) {
            long projectId = projectStatus.getProject().getProjectId();
            projectRequestResponseDto.setProjectId(projectId);
        }

        if (projectStatus.getMember() != null) {
            long memberId = projectStatus.getMember().getMemberId();
            String imgUrl = projectStatus.getMember().getImgUrl();
            String userName = projectStatus.getMember().getUserName();
            projectRequestResponseDto.setMemberId(memberId);
        }

        if (projectStatus.getCommonCode() != null) {
            long commonCodeId = projectStatus.getCommonCode().getCodeId();
            projectRequestResponseDto.setCommonCodeId(commonCodeId);
        }

        if (projectStatus.getCommonCode() !=null) {
            String codeName = projectStatus.getCommonCode().getCodeName();
            projectRequestResponseDto.setCodeName(codeName);
        }

        return projectRequestResponseDto;

    }

    default ProjectResponseDto projectToProjectResponseDto(Project project) {

        ProjectResponseDto projectResponseDto = ProjectResponseDto.builder()
                .projectId(project.getProjectId())
                .memberId(project.getMember().getMemberId())
                .userName(project.getMember().getUsername())
                .userImgUrl(project.getMember().getImgUrl())
                .title(project.getTitle())
                .totalPeople(project.getTotalPeople())
                .joinPeople(project.getJoinPeople())
                .requestPeople(project.getRequestPeople())
                .createdAt(project.getCreatedAt())
                .modifiedAt(project.getModifiedAt())
                .images(project.getImages())
//                .closedAt(project.getClosedAt())
                .lang(project.getLang())
                .tags(project.getTags())
                .body(project.getBody())
                .description(project.getDescription())
                .heartCount(project.getHeartCount())
                .view(project.getView())
                .projectTitleImage(project.getProjectTitleImage())
                .build();

        return projectResponseDto;
    }

    default List<ProjectResponseDto> projectsToProjectResponseDtos(List<Project> projects) {
        return projects.stream()
                .map(this::projectToProjectResponseDto)
                .collect(Collectors.toList());
    }


    Portfolio projectPatchDtoToPortfolio(ProjectPatchDto projectPatchDto);



    default List<ProjectProfileResponseDto> projectToProfileResponseDto(List<Project> projectList){
        return projectList.stream()
                .map(project -> new ProjectProfileResponseDto(
                        project.getProjectId(),
                        project.getTitle(),
                        project.getCreatedAt(),
                        project.getHeartCount(),
                        project.getView()
                )).collect(Collectors.toList());
    }

    default List<ProjectProfileResponseDto> projectHeartListToProfileResponseDto(List<ProjectHeart> projectHeartList){
        return projectHeartList.stream()
                .map(projectHeart -> new ProjectProfileResponseDto(
                        projectHeart.getProject().getProjectId(),
                        projectHeart.getProject().getTitle(),
                        projectHeart.getProject().getCreatedAt(),
                        projectHeart.getProject().getHeartCount(),
                        projectHeart.getProject().getView(),
                        projectHeart.getMember()
                )).collect(Collectors.toList());
    }

    default List<ProjectProfileResponseDto> supportedProjectsToProfileResponseDto(List<ProjectStatus> projectStatusList){
        return projectStatusList.stream()
                .map(projectStatus -> new ProjectProfileResponseDto(
                        projectStatus.getProject().getProjectId(),
                        projectStatus.getProject().getTitle(),
                        projectStatus.getProject().getCreatedAt(),
                        projectStatus.getProject().getHeartCount(),
                        projectStatus.getProject().getView(),
                        projectStatus.getMember()
                )).collect(Collectors.toList());
    }

}

