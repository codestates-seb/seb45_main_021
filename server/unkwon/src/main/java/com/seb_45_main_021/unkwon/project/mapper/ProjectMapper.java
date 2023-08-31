package com.seb_45_main_021.unkwon.project.mapper;

import com.seb_45_main_021.unkwon.project.dto.ProjectPatchDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectPostDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectRequestDto;
import com.seb_45_main_021.unkwon.project.dto.ProjectResponseDto;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    Project projectPostDtoToProject(ProjectPostDto projectPostDto);
    Project projectPatchDtoToProject(ProjectPatchDto projectPatchDto);
    ProjectStatus projectRequestDtoToProjectStatus(ProjectRequestDto projectRequestDto);
    ProjectResponseDto projectToProjectResponseDto(Project project);
}
