package com.seb_45_main_021.unkwon.portfolio.dto;

import com.seb_45_main_021.unkwon.dto.Author;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioImage;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioTitleImage;
import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class PortfolioDto {
    @Getter
    @Setter
    public static class Post{

        private long memberId;
        private String title;
        private String body;
        private String tags;
        private String lang;
        private int isEmploy;
        private int isComment;
    }

    @Getter
    @Setter
    public static class Patch{

        private long portfolioId;
        private String title;
        private String body;
        private String tags;
        private String lang;
        private int isEmploy;
        private int isComment;
    }

    @Getter
    @Setter
    @Builder
    public static class Response{

        private long portfolioId;
        private long memberId;
        private String userName;
        private String userImgUrl;
        private String title;
        private LocalDateTime createdAt;
        private PortfolioTitleImage portfolioTitleImage;
        private String[] tags;
        private String lang;
        private int heartCount;
        private int IsEmploy;
    }

    @Getter
    @Setter
    @Builder
    public static class TopResponse{
        private long portfolioId;
        private String title;
    }

    @Getter
    @Setter
    @Builder
    public static class DetailResponse{
        private long memberId;
        private String userName;
        private String userImgUrl;
        private long portfolioId;
        private String title;
        private String body;
        private List<PortfolioImage> images;
        private PortfolioTitleImage portfolioTitleImage;
        private int view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<PortfolioDto.CommentResponse> comments;
        private int IsComment;
        private int IsEmploy;
        private String[] tags;
        private String lang;
        private int heartCount;
    }

    @Getter @Setter
    @Builder
    @AllArgsConstructor
    public static class CommentResponse {
        private long commentId;
        private String body;
        private long portfolioId;
        private long memberId;
        private String userName;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    public static class PortfolioProfileResponseDto {
        private Long portFolioId;
        private String title;
        private String createdAt;
        private int heartCount;
        private Author author;

        public PortfolioProfileResponseDto(Long portFolioId, String title, LocalDateTime createdAt, int heartCount) {
            this.portFolioId = portFolioId;
            this.title = title;
            setCreatedAt(createdAt);
            this.heartCount = heartCount;
        }

        public PortfolioProfileResponseDto(Long portFolioId, String title, LocalDateTime createdAt, int heartCount, Member member) {
            this.portFolioId = portFolioId;
            this.title = title;
            setCreatedAt(createdAt);
            this.heartCount = heartCount;
            author = Author.builder()
                    .userName(member.getUserName())
                    .memberId(member.getMemberId())
                    .build();
        }

        public void setCreatedAt(LocalDateTime createdAt){
            // YYYY-DD-MM 포맷 형식
            this.createdAt = createdAt.format(DateTimeFormatter.ISO_DATE);
        }
    }
}
