package com.seb_45_main_021.unkwon.projectcard.dto.response;

import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCardApplyResponseDto {
    private Long projectCardId;
    private String[] tags;
    private String tell;
    private String aboutMe;
    private String userImgUrl;
    private Long memberId;
    private String userName;
    private String email;
    private boolean working;

    public ProjectCardApplyResponseDto(Long projectCardId, String aboutMe, String tell, String tags, Member member) {
        this.projectCardId = projectCardId;
        this.aboutMe = aboutMe;
        this.tell = tell;
        setTag(tags);
        this.userName = member.getUserName();
        this.memberId = member.getMemberId();
        this.userImgUrl = member.getUserImgUrl();
        this.email = member.getEmail();
        this.working = member.isWorking();
    }

    public void setTag(String tags){
        // 태그 입력 전 이면 빈배열, 입력 후 라면 split 배열
        if(tags == null || tags.equals("[]")) this.tags = new String[]{};
        else {
            this.tags =  tags.replaceAll(" ", "")
                    .replace("[", "")
                    .replace("]", "")
                    .split(",");
        }
    }
}
