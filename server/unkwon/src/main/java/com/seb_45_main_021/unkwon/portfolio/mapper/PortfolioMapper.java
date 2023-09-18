package com.seb_45_main_021.unkwon.portfolio.mapper;

import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.dto.PortfolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {


    default Portfolio portfolioPostDtoToPortfolio(PortfolioDto.Post portfolioPostDto){

        Member member = new Member();
        member.setMemberId(portfolioPostDto.getMemberId());

        Portfolio portfolio = new Portfolio();
        portfolio.setTitle(portfolioPostDto.getTitle());
        portfolio.setBody(portfolioPostDto.getBody());
        portfolio.setLang((portfolioPostDto.getLang()));
        portfolio.setIsComment(portfolioPostDto.getIsComment());
        portfolio.setIsEmploy(portfolioPostDto.getIsEmploy());
        portfolio.setMember(member);



        if(portfolioPostDto.getTags() != null) {
            String[] tags = portfolioPostDto.getTags().split(",");
            portfolio.setTagA(tags[0]);
            if(tags.length >= 2) portfolio.setTagB(tags[1]);
            if(tags.length >= 3) portfolio.setTagC(tags[2]);
        }

        return portfolio;
    };



    default Portfolio portfolioPatchDtoToPortfolio(PortfolioDto.Patch portfolioPatchDto){

        Portfolio portfolio = new Portfolio();

        portfolio.setPortfolioId(portfolioPatchDto.getPortfolioId());
        portfolio.setTitle(portfolioPatchDto.getTitle());
        portfolio.setBody(portfolioPatchDto.getBody());
        portfolio.setLang(portfolioPatchDto.getLang());
        portfolio.setIsComment(portfolioPatchDto.getIsComment());
        portfolio.setIsEmploy(portfolioPatchDto.getIsEmploy());


        if(portfolioPatchDto.getTags() != null) {
            portfolio.setTagA(null);
            portfolio.setTagB(null);
            portfolio.setTagC(null);
            String[] tags = portfolioPatchDto.getTags().split(",");
            if(tags.length >= 1) portfolio.setTagA(tags[0]);
            if(tags.length >= 2) portfolio.setTagB(tags[1]);
            if(tags.length >= 3) portfolio.setTagC(tags[2]);
        }

        return portfolio;
    };


    default PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portfolio){

        List<String> tagsList = new ArrayList<>();
        if (portfolio.getTagA() != null) {
            tagsList.add(portfolio.getTagA());
        }
        if (portfolio.getTagB() != null) {
            tagsList.add(portfolio.getTagB());
        }
        if (portfolio.getTagC() != null) {
            tagsList.add(portfolio.getTagC());
        }
        String[] tags = tagsList.toArray(new String[0]);


        PortfolioDto.Response response = PortfolioDto.Response.builder()
                .portfolioId(portfolio.getPortfolioId())
                .memberId(portfolio.getMember().getMemberId())
                .userName(portfolio.getMember().getUserName())
                .userImgUrl(portfolio.getMember().getUserImgUrl())
                .title(portfolio.getTitle())
                .createdAt(portfolio.getCreatedAt())
                .tags(tags)
                .lang(portfolio.getLang())
                .heartCount(portfolio.getHeartCount())
                .IsEmploy(portfolio.getIsEmploy())
                .portfolioTitleImage(portfolio.getPortfolioTitleImage())
                .build();



        return response;
    }


    List<PortfolioDto.Response> portfoliosToPortfolioResponseDtos(List<Portfolio> portfolios);

    default PortfolioDto.DetailResponse portfolioToPortfolioDetailResponseDto(Portfolio portfolio){
        List<String> tagsList = new ArrayList<>();
        if (portfolio.getTagA() != null) {
            tagsList.add(portfolio.getTagA());
        }
        if (portfolio.getTagB() != null) {
            tagsList.add(portfolio.getTagB());
        }
        if (portfolio.getTagC() != null) {
            tagsList.add(portfolio.getTagC());
        }
        String[] tags = tagsList.toArray(new String[0]);

        PortfolioDto.DetailResponse detailResponse = PortfolioDto.DetailResponse.builder()
                .portfolioId(portfolio.getPortfolioId())
                .memberId(portfolio.getMember().getMemberId())
                .userName(portfolio.getMember().getUserName())
                .title(portfolio.getTitle())
                .body(portfolio.getBody())
                .createdAt(portfolio.getCreatedAt())
                .modifiedAt(portfolio.getModifiedAt())
                .view(portfolio.getView())
                .tags(tags)
                .lang(portfolio.getLang())
                .IsEmploy(portfolio.getIsEmploy())
                .IsComment(portfolio.getIsComment())
                .heartCount(portfolio.getHeartCount())
                .images(portfolio.getImages())
                .portfolioTitleImage(portfolio.getPortfolioTitleImage())
                .build();

        // 댓글이 있는 경우에만 댓글을 추가
        if (portfolio.getComments() != null && !portfolio.getComments().isEmpty()) {
            List<Comment> comments = portfolio.getComments();

            List<PortfolioDto.CommentResponse> commentResponses =
                    comments.stream().map(comment -> PortfolioDto.CommentResponse.builder()
                            .commentId(comment.getCommentId())
                            .body(comment.getBody())
                            .createdAt(comment.getCreatedAt())
                            .modifiedAt(comment.getModifiedAt())
                            .memberId(comment.getMember().getMemberId())
                            .userName(comment.getMember().getUserName())
                            .portfolioId(comment.getPortFolio().getPortfolioId())
                            .build()
                    ).collect(Collectors.toList());

            detailResponse.setComments(commentResponses);
        } else {
            // 댓글이 없는 경우 빈 배열로 초기화
            detailResponse.setComments(Collections.emptyList());
        }
        return detailResponse;
    }


    default List<PortfolioDto.PortfolioProfileResponseDto> portFolioListToProfileResponseDto(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .map(portFolio -> new PortfolioDto.PortfolioProfileResponseDto(
                        portFolio.getPortfolioId(),
                        portFolio.getTitle(),
                        portFolio.getCreatedAt(),
                        portFolio.getHeartCount()
                )).collect(Collectors.toList());
    }

    default List<PortfolioDto.PortfolioProfileResponseDto> portFolioHeartListToProfileResponseDto(List<PortfolioHeart> portfolioHeartList){
        return portfolioHeartList.stream()
                .map(portfolioHeart -> new PortfolioDto.PortfolioProfileResponseDto(
                        portfolioHeart.getPortFolio().getPortfolioId(),
                        portfolioHeart.getPortFolio().getTitle(),
                        portfolioHeart.getPortFolio().getCreatedAt(),
                        portfolioHeart.getPortFolio().getHeartCount(),
                        portfolioHeart.getMember()
                )).collect(Collectors.toList());
    }
}
