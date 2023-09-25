package com.seb_45_main_021.unkwon.dto;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class MemberHeartDto {
    private List<Long> portfolioList = new ArrayList<>();
    private List<Long> projectList = new ArrayList<>();

    public MemberHeartDto(List<PortfolioHeart> portfolioHeartList, List<ProjectHeart> projectHeartList) {
        setPortfolioList(portfolioHeartList);
        setProjectList(projectHeartList);
    }

    private void setPortfolioList(List<PortfolioHeart> portfolioHeartList){
        portfolioHeartList.stream()
                .forEach(portfolioHeart -> this.portfolioList.add(portfolioHeart.getPortFolio().getPortfolioId()));
    }
    private void setProjectList(List<ProjectHeart> projectHeartList){
        projectHeartList.stream()
                .forEach(projectHeart -> this.projectList.add(projectHeart.getProject().getProjectId()));
    }
}
