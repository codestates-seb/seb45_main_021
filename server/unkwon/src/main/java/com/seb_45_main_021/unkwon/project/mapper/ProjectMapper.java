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
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

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
        project.setLang(Arrays.toString(projectPostDto.getLang()));
        project.setTags(Arrays.toString(projectPostDto.getTags()));
        project.setBody(projectPostDto.getBody());
        project.setDescription(projectPostDto.getDescription());
        project.setClosedAt(projectPostDto.getClosedAt());

        return project;
    }

    default Project projectPatchDtoToProject(ProjectPatchDto projectPatchDto) {
        Project project = new Project();

        project.setProjectId(projectPatchDto.getProjectId());
        project.setTitle(projectPatchDto.getTitle());
        project.setTotalPeople(projectPatchDto.getTotalPeople());
        project.setLang(Arrays.toString(projectPatchDto.getLang()));
        project.setTags(Arrays.toString(projectPatchDto.getTags()));
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

    default ProjectResponseDto projectToProjectResponseDto(Project project) {

        ProjectResponseDto projectResponseDto = ProjectResponseDto.builder()
                .projectId(project.getProjectId())
                .memberId(project.getMember().getMemberId())
                .title(project.getTitle())
                .totalPeople(project.getTotalPeople())
                .joinPeople(project.getJoinPeople())
                .requestPeople(project.getRequestPeople())
                .createdAt(project.getCreatedAt())
                .modifiedAt(project.getModifiedAt())
                .closedAt(project.getClosedAt())
                .lang(new String[]{project.getLang()})
                .tags(new String[]{project.getTags()})
                .body(project.getBody())
                .description(project.getDescription())
                .heartCount(project.getHeartCount())
                .view(project.getView())
                .build();

        return projectResponseDto;
    }

    default List<ProjectResponseDto> projectsToProjectResponseDtos(List<Project> projects) {
        return projects.stream()
                .map(this::projectToProjectResponseDto)
                .collect(Collectors.toList());
    }

    @Mapping(target = "tags", expression = "java(mapping(projectPatchDto.getTags()))")
    @Mapping(target = "lang", expression = "java(mapping(projectPatchDto.getLang()))")
    PortFolio projectPatchDtoToPortfolio(ProjectPatchDto projectPatchDto);

    default String mapping(String[] tags) {
        if (tags == null || tags.length == 0) {
            return null;
        }
        return String.join(",", tags);
    }


}

