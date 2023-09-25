package unkwon.dto;

import com.seb_45_main_021.unkwon.member.dto.response.MemberInformResponseDto;
import com.seb_45_main_021.unkwon.portfolio.dto.PortfolioDto;
import com.seb_45_main_021.unkwon.project.dto.response.ProjectProfileResponseDto;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardResponseDto;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MultiInformResponseDto {
    private MemberInformResponseDto profile;
    private List<List<ProjectProfileResponseDto>> project = new ArrayList<>(); // 신청한 프로젝트의 경우 사용자 정보 필요
    private List<List<PortfolioDto.PortfolioProfileResponseDto>> portFolio = new ArrayList();  // 필요 없음.
    private List<PortfolioDto.PortfolioProfileResponseDto> portfolioHeart = new ArrayList<>(); // 필요 있음
    private List<ProjectProfileResponseDto> projectHeart = new ArrayList<>(); // 필요 있음
    private List<ProjectCardResponseDto> projectCard = new ArrayList<>();

    public void setProjectList(List<ProjectProfileResponseDto> list1, List<ProjectProfileResponseDto> list2) {
        this.project.add(list1);
        this.project.add(list2);
    }

    public void setPortfoliolist(List<PortfolioDto.PortfolioProfileResponseDto> list1, List<PortfolioDto.PortfolioProfileResponseDto> list2) {
        this.portFolio.add(list1);
        this.portFolio.add(list2);
    }

    public void setPortfolioHeartList(List<PortfolioDto.PortfolioProfileResponseDto> list) {
        this.portfolioHeart = list;
    }

    public void setProjectHeartList(List<ProjectProfileResponseDto> list) {
        this.projectHeart = list;
    }

    public void setProjectCardList(List<ProjectCardResponseDto> projectCardList){
        this.projectCard = projectCardList;
    }

    public MultiInformResponseDto(MemberInformResponseDto dto) {
        this.profile = dto;
    }
}
