package com.seb_45_main_021.unkwon.dto;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.member.dto.response.MemberInformResponseDto;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardResponseDto;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MultiInformResponseDto {
    private MemberInformResponseDto profile;
    private List<List<Project>> project = new ArrayList<>();
    private List<List<PortFolio>> portFolio = new ArrayList();
    private List<List<PortfolioHeart>> heart = new ArrayList<>();
    private List<ProjectCardResponseDto> projectCard;
    private final int INDEX = 1;

    public void setProjectList(List<Project> list1, List<Project> list2) {
        this.project.add(list1);
        this.project.add(list2);
    }
    public void setPortFoliolist(List<PortFolio> list1, List<PortFolio> list2) {
        this.portFolio.add(list1);
        this.portFolio.add(list2);
    }

    public void setHeartList(List<PortfolioHeart> list1, List<PortfolioHeart> list2) {
        this.heart.add(list1);
        this.heart.add(list2);
    }

    public void setProjectCardList(List<ProjectCardResponseDto> projectCardList){
        this.projectCard = projectCardList;
    }

    public MultiInformResponseDto(MemberInformResponseDto dto) {
        this.profile = dto;
    }
}
