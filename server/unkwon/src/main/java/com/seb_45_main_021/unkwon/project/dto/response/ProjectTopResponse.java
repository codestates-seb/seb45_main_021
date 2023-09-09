package com.seb_45_main_021.unkwon.project.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProjectTopResponse {

    private long projectId;

    private String title;
}
