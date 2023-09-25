package com.seb_45_main_021.unkwon.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Author {
    private Long memberId;
    private String userName;
}
