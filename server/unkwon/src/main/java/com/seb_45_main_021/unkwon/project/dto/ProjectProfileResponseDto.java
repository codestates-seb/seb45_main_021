package com.seb_45_main_021.unkwon.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class ProjectProfileResponseDto {
    private Long projectId;
    private String title;
    private String createdAt;
    private int heartCount;
    private int view;

    public ProjectProfileResponseDto(Long projectId, String title, LocalDateTime createdAt, int heartCount, int view) {
        this.projectId = projectId;
        this.title = title;
        setCreatedAt(createdAt);
        this.heartCount = heartCount;
        this.view = view;
    }

    public void setCreatedAt(LocalDateTime createdAt){
        // YYYY-DD-MM 포맷 형식
        this.createdAt = createdAt.format(DateTimeFormatter.ISO_DATE);
    }
}