package unkwon.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Author {
    private Long memberId;
    private String userName;
}
