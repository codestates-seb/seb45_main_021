package com.seb_45_main_021.unkwon.projectcard.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ProjectCardPatchDto {
    @Setter
    private Long projectCardId;
    private String title;
    private String tell;
    private String aboutMe;
    // 태그
    private String[] tags;
}
