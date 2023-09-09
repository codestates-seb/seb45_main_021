package com.seb_45_main_021.unkwon.project.dto.response;

import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectApplicationStatusResponseDto {

    private List<JoinPeopleResponseDto> joinPeople;
    private List<ProjectCardResponseDto> requestPeople;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JoinPeopleResponseDto {
        private long memberId;
        private String imgUrl;
        private String username;

    }

}
