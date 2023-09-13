package com.seb_45_main_021.unkwon.project.dto.response;

import com.seb_45_main_021.unkwon.image.ProjectImage;
import com.seb_45_main_021.unkwon.image.ProjectTitleImage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class ProjectResponseDto {
    private long projectId;
    private int view;
    private long memberId;
    private  String userName;
    private String userImgUrl;
    private String title;
    private int totalPeople;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private LocalDate closedAt;
    private String body;
    private List<Long> joinPeople;
    private List<Long> requestPeople;
    private List<ProjectImage> images;
    private ProjectTitleImage projectTitleImage;
    private String description;
    private String[] tags;
    private String lang;
    private int heartCount;
}
