package com.seb_45_main_021.unkwon.projectcard.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@NoArgsConstructor
@Getter
public class ProjectCardPostDto {
    @Setter
    private Long memberId;

    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
    private String tell;

    @NotBlank
    private String aboutMe;

    @NotNull
    private String[] tags;
}