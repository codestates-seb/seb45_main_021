package com.seb_45_main_021.unkwon.member.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class MemberInformResponseDto {
    private Long memberId;
    private String email;
    private String userName;
    private String aboutMe;
    private String imgUrl;
    private int age;
    private boolean isWorking;
    private String createdAt;
    private String[] tag;


    public void setTag(String tags){
        // 태그 입력 전 이면 빈배열, 입력 후 라면 split 배열
        this.tag = tags == null ? new String[]{} : tags.replaceAll(" ", "").split(",");
    }

    public void setCreatedAt(LocalDateTime createdAt){
        // YYYY-DD-MM 포맷 형식
        this.createdAt = createdAt.format(DateTimeFormatter.ISO_DATE);
    }
}
