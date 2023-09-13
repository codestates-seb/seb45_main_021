package com.seb_45_main_021.unkwon.member.dto.response;

import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import lombok.Builder;

import java.util.ArrayList;
import java.util.List;

public class LoginResponseDto {
    private Long memberId;
    private String userName;
    private String userImgUrl;
    private SocialType socialType;
    private List<Long> portfolioList = new ArrayList<>();
    private List<Long> projectList = new ArrayList<>();

    public LoginResponseDto(Long memberId, String userName, String userImgUrl, SocialType socialType, List<PortfolioHeart> portfolioHeartList, List<ProjectHeart> projectHeartList) {
        this.memberId = memberId;
        this.userName = userName;
        this.userImgUrl = userImgUrl;
        this.socialType = socialType;
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
