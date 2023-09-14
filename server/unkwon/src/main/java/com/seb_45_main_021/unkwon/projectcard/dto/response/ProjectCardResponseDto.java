package com.seb_45_main_021.unkwon.projectcard.dto.response;

import lombok.Getter;

@Getter
public class ProjectCardResponseDto {
    private Long projectCardId;
    private String[] tags;
    private String tell;
    private String aboutMe;

    public ProjectCardResponseDto(Long projectCardId, String aboutMe, String tell, String tags) {
        this.projectCardId = projectCardId;
        this.aboutMe = aboutMe;
        this.tell = tell;
        setTag(tags);
    }

    private void setTag(String tags) {
        if (tags == null || tags.equals("[]")) this.tags = new String[]{};
        else {
            this.tags = tags.replaceAll(" ", "")
                    .replace("[", "")
                    .replace("]", "")
                    .split(",");
        }
    }
}
