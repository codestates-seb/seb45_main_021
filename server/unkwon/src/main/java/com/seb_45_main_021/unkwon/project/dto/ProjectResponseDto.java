package com.seb_45_main_021.unkwon.project.dto;

import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class ProjectResponseDto {
    private long projectId;

    private String title;

    private int totalPeople;


//    private List<ProjectJoinPeople> projectJoinPeople = new ArrayList<>();


//    private List<Member> requestPeople;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private LocalDateTime closedAt;

    private String language;


//    private List<Tag> tag = new ArrayList<>();


    private String body;


//    private List<Image> images;


    private String description;


//    private List<ProjectLike> likes;
}
