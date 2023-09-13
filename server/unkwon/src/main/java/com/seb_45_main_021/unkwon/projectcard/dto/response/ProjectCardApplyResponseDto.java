package com.seb_45_main_021.unkwon.projectcard.dto.response;

import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.Getter;

@Getter
public class ProjectCardApplyResponseDto {
    private Long projectCardId;
    private String[] tags;
    private String tell;
    private String aboutMe;
    private String img;
    private String userName;
    private String email;
    private boolean working;


    public ProjectCardApplyResponseDto(Long projectCardId, String aboutMe, String tell, String tags, Member member) {
        this.projectCardId = projectCardId;
        this.aboutMe = aboutMe;
        this.tell = tell;
        setTag(tags);
        this.userName = member.getUserName();
        this.email = member.getEmail();
        this.working = member.isWorking();
    }

    public void setTag(String tags){
        // 태그 입력 전 이면 빈배열, 입력 후 라면 split 배열
        this.tags = tags == null ? new String[]{}
                : tags.replaceAll(" ", "")
                .replace("[", "")
                .replace("]", "")
                .split(",");
    }
}
