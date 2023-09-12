package com.seb_45_main_021.unkwon.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    public static class PostDto {
        @Positive
        @NotNull
        private long memberId;

        @Positive
        @NotNull
        private long portfolioId;

        @NotBlank(message = "댓글 내용을 작성해주세요.")
        @Size(max = 500, message = "500자 이하로 입력해 주세요.")
        private String body;
    }


    @Getter @Setter
    public static class PatchDto {
        private long commentId;

        @NotBlank(message = "댓글 내용을 작성해주세요.")
        @Size(max = 500, message = "500자 이하로 입력해 주세요.")
        private String body;
    }


    @Getter @Setter
    @AllArgsConstructor
    @Builder
    public static class ResponseDto {
        private long commentId;
        private String body;

        private long portfolioId;

        private long memberId;
        private String email;
        private String userName;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}