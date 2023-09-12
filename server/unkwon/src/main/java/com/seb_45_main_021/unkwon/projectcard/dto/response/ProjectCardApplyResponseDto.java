package com.seb_45_main_021.unkwon.projectcard.dto.response;

import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.Getter;

@Getter
public class ProjectCardApplyResponseDto {
    private Long projectCardId;
    private String[] tag;
    private String tell;
    private String aboutMe;
    private String img;
    private String userName;
    private String email;
    private boolean working;


    public ProjectCardApplyResponseDto(Long projectCardId, String aboutMe, String tell, String tag, Member member) {
        this.projectCardId = projectCardId;
        this.aboutMe = aboutMe;
        this.tell = tell;
        this.tag = setTag(tag);
        this.userName = member.getUserName();
        this.email = member.getEmail();
        this.working = member.isWorking();
    }

    private String[] setTag(String tag){
        return tag.replaceAll(" ", "").split(",");
    }
}
