package com.seb_45_main_021.unkwon.project.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Getter
@Setter
public class ProjectPostDto {
    private long memberId;

    private String title;

    private int totalPeople;

//    private LocalDate closedAt;

    private String body;

    private String description;

    private String[] tags;

    private String lang;
}
