package com.seb_45_main_021.unkwon.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class PortfolioDto {
    @Getter
    @Setter
    public static class Post{

        private long memberId;
        private String title;
        private String content;
        private String[] tags;
        private String[] lang;

    }

    @Getter
    @Setter
    @Builder
    public static class Patch{

        private long portfolioId;
        private String title;
        private String content;
        private String[] tags;
        private String[] lang;


    }

    @Getter
    @Setter
    @Builder
    public static class Response{

        private long portfolioId;
        private int view;
        private long memberId;
        private String email;
        private String username;

        private String title;
        private String content;
        private int commentCount;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String[] tags;
        private String[] lang;
        private int heartCount;

    }

    @Getter
    @Setter
    @Builder
    public static class DetailResponse{
        private long memberId;
        private String email;
        private String username;
        private long portfolioId;
        private String title;
        private String content;
        private int view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<PortfolioDto.CommentResponse> comments;
        private int commentCount;
        private boolean IsComment;
        private boolean IsEmploy;
        private String[] tags;
        private String[] lang;
        private int heartCount;
    }
    @Getter @Setter
    @Builder
    @AllArgsConstructor
    public static class CommentResponse {
        private long commentId;
        private String content;

        private long portfolioId;

        private long memberId;
        private String email;
        private String userName;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
