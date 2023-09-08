package com.seb_45_main_021.unkwon.member.dto.response;

import com.seb_45_main_021.unkwon.member.entity.SocialType;
import lombok.Builder;

@Builder
public class LoginResponseDto {
    private Long memberId;
    private String username;
    private String imgUrl;
    private SocialType socialType;
}
