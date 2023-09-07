package com.seb_45_main_021.unkwon.project.dto;

import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class ProjectResponseDto {
    private long projectId;
    private int view;
    private long memberId;
    private String title;
    private int totalPeople;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String closedAt;
    private String body;

    private List<Long> joinPeople;

    private List<Long> requestPeople;

//    private List<Image> images;

    private String description;
    private String[] tags;
    private String[] lang;
    private int heartCount;

}