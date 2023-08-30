package com.seb_45_main_021.unkwon.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Getter
public class MemberSignupDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String username;
}
