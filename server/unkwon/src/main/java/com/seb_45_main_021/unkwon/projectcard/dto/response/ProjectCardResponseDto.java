package com.seb_45_main_021.unkwon.projectcard.dto.response;

import lombok.Getter;

@Getter
public class ProjectCardResponseDto {
    private Long projectCardId;
    private String title;
    private String[] tag;
    private String tell;
    private String aboutMe;

    public ProjectCardResponseDto(Long projectCardId, String title, String aboutMe, String tell, String tag) {
        this.projectCardId = projectCardId;
        this.title = title;
        this.aboutMe = aboutMe;
        this.tell = tell;
        this.tag = setTag(tag);
    }

    private String[] setTag(String tag){
        return tag.replaceAll(" ", "").split(",");
    }
}
