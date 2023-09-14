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

        Portfolio portFolio = new Portfolio();
        portFolio.setTitle(portfolioPostDto.getTitle());
        portFolio.setBody(portfolioPostDto.getBody());
        portFolio.setTags(new String[]{portfolioPostDto.getTags()});
        portFolio.setLang((portfolioPostDto.getLang()));
        portFolio.setMember(member);

        return portFolio;
    };



    @Mapping(target = "tags", expression = "java(mapTags(portfolioPatchDto.getTags()))")
    Portfolio portfolioPatchDtoToPortfolio(PortfolioDto.Patch portfolioPatchDto);
    default String [] mapTags(String tags) {
        if (tags == null || tags.isEmpty()) {
            return new String[0];
        }
        return  tags.split(",");
    }
    private String[] parseTags(String tags) {
        if (tags == null || tags.isEmpty()) {
            return null;
        }

        // 태그 문자열을 쉼표로 분리하여 배열로 반환
        String[] tagArray = tags.split(",");

        // 각 태그 문자열의 양 끝에 있는 공백 및 대괄호 제거
        for (int i = 0; i < tagArray.length; i++) {
            tagArray[i] = tagArray[i].trim().replaceAll("^\\[|\\]$", "");
        }

        return tagArray;
    }


    default PortfolioDto.Response portfolioToPortfolioResponseDto(Portfolio portFolio){
        PortfolioDto.Response response = PortfolioDto.Response.builder()
                .portfolioId(portFolio.getPortfolioId())
                .memberId(portFolio.getMember().getMemberId())
                .userName(portFolio.getMember().getUserName())
                .userImgUrl(portFolio.getMember().getUserImgUrl())
                .title(portFolio.getTitle())
                .createdAt(portFolio.getCreatedAt())
                .tags(parseTags(Arrays.toString(portFolio.getTags())))
                .lang(portFolio.getLang())
                .heartCount(portFolio.getHeartCount())
                .IsEmploy(portFolio.isIsEmploy())
                .build();

        return response;
    }


    List<PortfolioDto.Response> portfoliosToPortfolioResponseDtos(List<Portfolio> portfolios);

    default PortfolioDto.DetailResponse portfolioToPortfolioDetailResponseDto(Portfolio portFolio){

        PortfolioDto.DetailResponse detailResponse = PortfolioDto.DetailResponse.builder()
                .portfolioId(portFolio.getPortfolioId())
                .memberId(portFolio.getMember().getMemberId())
                .userName(portFolio.getMember().getUserName())
                .title(portFolio.getTitle())
                .body(portFolio.getBody())
                .createdAt(portFolio.getCreatedAt())
                .modifiedAt(portFolio.getModifiedAt())
                .view(portFolio.getView())
                .tags(parseTags(Arrays.toString(portFolio.getTags())))
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
