package com.seb_45_main_021.unkwon.project.mapper;

import com.seb_45_main_021.unkwon.commonCode.CommonCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.dto.PortFolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.project.dto.ProjectPatchDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectPostDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectRequestDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    default Project projectPostDtoToProject(ProjectPostDto projectPostDto) {
        Project project = new Project();

        Member member = new Member();
        member.setMemberId(projectPostDto.getMemberId());
        project.setMember(member);


        project.setTitle(projectPostDto.getTitle());
        project.setTotalPeople(projectPostDto.getTotalPeople());
        project.setLanguage(projectPostDto.getLanguage());
        project.setBody(projectPostDto.getBody());
        project.setDescription(projectPostDto.getDescription());

        return project;
    }

    default Project projectPatchDtoToProject(ProjectPatchDto projectPatchDto) {
        Project project = new Project();

        project.setProjectId(projectPatchDto.getProjectId());
        project.setTitle(projectPatchDto.getTitle());
        project.setTotalPeople(projectPatchDto.getTotalPeople());
        project.setLanguage(projectPatchDto.getLanguage());
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

        CommonCode commonCode = new CommonCode();
        commonCode.setCodeId(projectRequestDto.getCommonCodeId());
        projectStatus.setCommonCode(commonCode);

        return projectStatus;
    }

    default ProjectRequestDto projectStatusToprojectRequestDto(ProjectStatus projectStatus) {
        ProjectRequestDto projectRequestDto = new ProjectRequestDto();

        if (projectStatus.getProject() != null) {
            long projectId = projectStatus.getProject().getProjectId();
            projectRequestDto.setProjectId(projectId);
        }

        if (projectStatus.getMember() != null) {
            long memberId = projectStatus.getMember().getMemberId();
            projectRequestDto.setMemberId(memberId);
        }

        if (projectStatus.getCommonCode() != null) {
            long commonCodeId = projectStatus.getCommonCode().getCodeId();
            projectRequestDto.setCommonCodeId(commonCodeId);
        }

        if (projectStatus.getCommonCode() !=null) {
            String codeName = projectStatus.getCommonCode().getCodeName();
            projectRequestDto.setCodeName(codeName);
        }

        return projectRequestDto;

    }

    List<ProjectResponseDto> projectsToProjectResponseDtos(List<Project> projects);

    default ProjectResponseDto projectToProjectResponseDto(Project project) {

        ProjectResponseDto projectResponseDto = ProjectResponseDto.builder()
                .projectId(project.getProjectId())
                .memberId(project.getMember().getMemberId())
                .title(project.getTitle())
                .totalPeople(project.getTotalPeople())
                .createdAt(project.getCreatedAt())
                .modifiedAt(project.getModifiedAt())
                .closedAt(project.getClosedAt())
                .language(project.getLanguage())
                .body(project.getBody())
                .description(project.getDescription())
                .build();

        return projectResponseDto;
    }


}

