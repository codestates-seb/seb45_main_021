package com.seb_45_main_021.unkwon.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPostDto {
    private long memberId;

    private String title;

    private int totalPeople;

//    private LocalDateTime closedAt;

    private String language;

//    private List<Tag> tag = new ArrayList<>();

    private String body;

//    private List<Image> images;

    private String description;

}
