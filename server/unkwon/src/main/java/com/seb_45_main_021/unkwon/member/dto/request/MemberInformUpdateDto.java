package com.seb_45_main_021.unkwon.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberInformUpdateDto {
    private Long memberId;
    private boolean IsWorking;
    private String aboutMe;
    private String userName;
    private int age;
    // tag
    private String[] tags;
}
