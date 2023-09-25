package unkwon.projectcard.mapper;

import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardApplyResponseDto;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardResponseDto;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProjectCardMapper {
    default List<ProjectCardResponseDto> projectCardListToProjectCardResponseDto(List<ProjectCard> projectCardList){
        return projectCardList.stream()
                .map(projectCard -> new ProjectCardResponseDto(
                        projectCard.getProjectCardId(),
                        projectCard.getAboutMe(),
                        projectCard.getTell(),
                        projectCard.getTag()
                )).collect(Collectors.toList());
    }

    default List<ProjectCardApplyResponseDto> projectCardListToProjectCardApplyResponseDto(List<ProjectCard> projectCardList){
        return projectCardList.stream()
                .map(projectCard -> new ProjectCardApplyResponseDto(
                        projectCard.getProjectCardId(),
                        projectCard.getAboutMe(),
                        projectCard.getTell(),
                        projectCard.getTag(),
                        projectCard.getMember()
                )).collect(Collectors.toList());
    }
}
