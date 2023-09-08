package com.seb_45_main_021.unkwon.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequestDto {
    private long projectId;
    private long memberId;
    private long commonCodeId;
    private String codeName;

}
