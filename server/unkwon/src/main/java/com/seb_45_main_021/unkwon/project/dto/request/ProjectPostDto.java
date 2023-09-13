package com.seb_45_main_021.unkwon.project.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class ProjectPostDto {
    private long memberId;

    private String title;

    private int totalPeople;

    private String closedAt;

    private String body;

    private String description;

    private String[] tags;

    private String lang;
}
