package com.seb_45_main_021.unkwon.portfolio.mapper;

import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.dto.PortFolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PortFolioMapper {

    default Portfolio portfolioPostDtoToPortfolio(PortFolioDto.Post portfolioPostDto){
        Member member = new Member();
        member.setMemberId(portfolioPostDto.getMemberId());

        Portfolio portFolio = new Portfolio();
        portFolio.setTitle(portfolioPostDto.getTitle());
        portFolio.setContent(portfolioPostDto.getContent());
        portFolio.setTags(Arrays.toString(portfolioPostDto.getTags()));
        portFolio.setLang(Arrays.toString(portfolioPostDto.getLang()));
        portFolio.setMember(member);

        return portFolio;
    };



    @Mapping(target = "tags", expression = "java(mapping(portfolioPatchDto.getTags()))")
    @Mapping(target = "lang", expression = "java(mapping(portfolioPatchDto.getLang()))")
    Portfolio portfolioPatchDtoToPortfolio(PortFolioDto.Patch portfolioPatchDto);

    default String mapping(String[] tags) {
        if (tags == null || tags.length == 0) {
            return null;
        }
        return String.join(",", tags);
    }



    default PortFolioDto.Response portfolioToPortfolioResponseDto(Portfolio portFolio){

        PortFolioDto.Response response = PortFolioDto.Response.builder()
                .portfolioId(portFolio.getPortfolioId())
                .memberId(portFolio.getMember().getMemberId())
                .email(portFolio.getMember().getEmail())
                .username(portFolio.getMember().getUsername())
                .title(portFolio.getTitle())
                .content(portFolio.getContent())
                .createdAt(portFolio.getCreatedAt())
                .modifiedAt(portFolio.getModifiedAt())
                .view(portFolio.getView())
                .commentCount(portFolio.getComments().size())
                .tags(new String[]{portFolio.getTags()})
                .lang(new String[]{portFolio.getLang()})
                .heartCount(portFolio.getHeartCount())
                .build();

        return response;


    };

    List<PortFolioDto.Response> portfoliosToPortfolioResponseDtos(List<Portfolio> portFolios);

    default PortFolioDto.DetailResponse portfolioToPortfolioDetailResponseDto(Portfolio portFolio){

        PortFolioDto.DetailResponse detailResponse = PortFolioDto.DetailResponse.builder()
                .portfolioId(portFolio.getPortfolioId())
                .memberId(portFolio.getMember().getMemberId())
                .email(portFolio.getMember().getEmail())
                .username(portFolio.getMember().getUsername())
                .title(portFolio.getTitle())
                .content(portFolio.getContent())
                .createdAt(portFolio.getCreatedAt())
                .modifiedAt(portFolio.getModifiedAt())
                .view(portFolio.getView())
                .commentCount(portFolio.getComments().size())
                .tags(new String[]{portFolio.getTags()})
                .lang(new String[]{portFolio.getLang()})
                .IsEmploy(portFolio.isIsEmploy())
                .IsComment(portFolio.isIsComment())
                .heartCount(portFolio.getHeartCount())
                .build();

        List<Comment> comments = portFolio.getComments();

        List<PortFolioDto.CommentResponse> commentResponses =
                comments.stream().map(comment -> PortFolioDto.CommentResponse.builder()
                        .commentId(comment.getCommentId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .memberId(comment.getMember().getMemberId())
                        .email(comment.getMember().getEmail())
                        .userName(comment.getMember().getUsername())
                        .portfolioId(comment.getPortFolio().getPortfolioId())
                        .build()
                ).collect(Collectors.toList());

        detailResponse.setComments(commentResponses);

        return detailResponse;
    };

    default List<PortFolioDto.PortFolioProfileResponseDto> portFolioListToProfileResponseDto(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .map(portFolio -> new PortFolioDto.PortFolioProfileResponseDto(
                        portFolio.getPortfolioId(),
                        portFolio.getTitle(),
                        portFolio.getCreatedAt(),
                        portFolio.getHeartCount(),
                        portFolio.getView()
                )).collect(Collectors.toList());
    }

    default List<PortFolioDto.PortFolioProfileResponseDto> portFolioHeartListToProfileResponseDto(List<PortfolioHeart> portfolioHeartList){
        return portfolioHeartList.stream()
                .map(portfolioHeart -> new PortFolioDto.PortFolioProfileResponseDto(
                        portfolioHeart.getPortFolio().getPortfolioId(),
                        portfolioHeart.getPortFolio().getTitle(),
                        portfolioHeart.getPortFolio().getCreatedAt(),
                        portfolioHeart.getPortFolio().getHeartCount(),
                        portfolioHeart.getPortFolio().getView()
                )).collect(Collectors.toList());
    }
}
