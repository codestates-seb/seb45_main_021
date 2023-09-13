package com.seb_45_main_021.unkwon.project.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPatchDto {

    private long projectId;
    private long memberId;
    private String title;
    private int totalPeople;
    private String body;
    private String description;
    private String tags;
    private String lang;

}
