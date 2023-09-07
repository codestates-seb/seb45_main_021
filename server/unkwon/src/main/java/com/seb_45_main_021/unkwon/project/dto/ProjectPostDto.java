package com.seb_45_main_021.unkwon.project.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
public class ProjectPostDto {
    private long memberId;

    private String title;

    private int totalPeople;

    @Pattern(regexp = "^(19|20)\\d\\d([- /.])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])$", message = "마감날짜가 유효하지 않습니다.")
    private String closedAt;

    private String body;

//    private List<Image> images;

    private String description;

    private String[] tags;

    private String[] lang;

}
