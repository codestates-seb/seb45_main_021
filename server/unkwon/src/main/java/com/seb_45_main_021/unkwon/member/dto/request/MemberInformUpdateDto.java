package com.seb_45_main_021.unkwon.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class MemberInformUpdateDto {
    @Setter
    private Long memberId;
    private boolean isWorking;
    private String aboutMe;
    private String username;
    private int age;
    // tag
    private String[] tags;
}
