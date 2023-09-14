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
        portfolio.setIsComment(portfolioPatchDto.isIsComment());
        portfolio.setIsEmploy(portfolioPatchDto.isIsEmploy());

        if(portfolioPatchDto.getTags() != null) {
            String[] tags = portfolioPatchDto.getTags().split(",");
            portfolio.setTagA(tags[0]);
            if(tags.length >= 2) portfolio.setTagB(tags[1]);
            if(tags.length >= 3) portfolio.setTagC(tags[2]);
        }

        return portfolio;
    };


    default PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portFolio){

        List<String> tagsList = new ArrayList<>();
        if (portFolio.getTagA() != null) {
            tagsList.add(portFolio.getTagA());
        }
        if (portFolio.getTagB() != null) {
            tagsList.add(portFolio.getTagB());
        }
        if (portFolio.getTagC() != null) {
            tagsList.add(portFolio.getTagC());
        }
        String[] tags = tagsList.toArray(new String[0]);


        PortfolioDto.Response response = PortfolioDto.Response.builder()
                .portfolioId(portFolio.getPortfolioId())
                .memberId(portFolio.getMember().getMemberId())
                .userName(portFolio.getMember().getUserName())
                .userImgUrl(portFolio.getMember().getUserImgUrl())
                .title(portFolio.getTitle())
                .createdAt(portFolio.getCreatedAt())
                .tags(tags)
                .lang(portFolio.getLang())
                .heartCount(portFolio.getHeartCount())
                .IsEmploy(portFolio.isIsEmploy())
                .build();



        return response;
    }


    List<PortfolioDto.Response> portfoliosToPortfolioResponseDtos(List<Portfolio> portfolios);

    default PortfolioDto.DetailResponse portfolioToPortfolioDetailResponseDto(Portfolio portFolio){
        List<String> tagsList = new ArrayList<>();
        if (portFolio.getTagA() != null) {
            tagsList.add(portFolio.getTagA());
        }
        if (portFolio.getTagB() != null) {
            tagsList.add(portFolio.getTagB());
        }
        if (portFolio.getTagC() != null) {
            tagsList.add(portFolio.getTagC());
        }
        String[] tags = tagsList.toArray(new String[0]);

        PortfolioDto.DetailResponse detailResponse = PortfolioDto.DetailResponse.builder()
                .portfolioId(portFolio.getPortfolioId())
                .memberId(portFolio.getMember().getMemberId())
                .userName(portFolio.getMember().getUserName())
                .title(portFolio.getTitle())
                .body(portFolio.getBody())
                .createdAt(portFolio.getCreatedAt())
                .modifiedAt(portFolio.getModifiedAt())
                .view(portFolio.getView())
                .tags(tags)
                .lang(portFolio.getLang())
                .IsEmploy(portFolio.isIsEmploy())
                .IsComment(portFolio.isIsComment())
                .heartCount(portFolio.getHeartCount())
                .build();

        List<Comment> comments = portFolio.getComments();

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

        return detailResponse;
    }


    default List<PortfolioDto.PortfolioProfileResponseDto> portFolioListToProfileResponseDto(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .map(portFolio -> new PortfolioDto.PortfolioProfileResponseDto(
                        portFolio.getPortfolioId(),
                        portFolio.getTitle(),
                        portFolio.getCreatedAt(),
                        portFolio.getHeartCount(),
                        portFolio.getView()
                )).collect(Collectors.toList());
    }

    default List<PortfolioDto.PortfolioProfileResponseDto> portFolioHeartListToProfileResponseDto(List<PortfolioHeart> portfolioHeartList){
        return portfolioHeartList.stream()
                .map(portfolioHeart -> new PortfolioDto.PortfolioProfileResponseDto(
                        portfolioHeart.getPortFolio().getPortfolioId(),
                        portfolioHeart.getPortFolio().getTitle(),
                        portfolioHeart.getPortFolio().getCreatedAt(),
                        portfolioHeart.getPortFolio().getHeartCount(),
                        portfolioHeart.getPortFolio().getView(),
                        portfolioHeart.getMember()
                )).collect(Collectors.toList());
    }
}
