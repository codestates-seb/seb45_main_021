package com.seb_45_main_021.unkwon.portfolio.mapper;

import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.dto.PortFolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PortFolioMapper {

    default PortFolio portfolioPostDtoToPortfolio(PortFolioDto.Post portfolioPostDto){
        Member member = new Member();
        member.setMemberId(portfolioPostDto.getMemberId());

        PortFolio portFolio = new PortFolio();
        portFolio.setTitle(portfolioPostDto.getTitle());
        portFolio.setContent(portfolioPostDto.getContent());
        portFolio.setMember(member);

        return portFolio;
    };

    PortFolio portfolioPatchDtoToPortfolio(PortFolioDto.Patch portfolioPatchDto);

    default PortFolioDto.Response portfolioToPortfolioResponseDto(PortFolio portFolio){

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
                .build();

        return response;


    };

    List<PortFolioDto.Response> portfoliosToPortfolioResponseDtos(List<PortFolio> portFolios);

    default PortFolioDto.DetailResponse portfolioToPortfolioDetailResponseDto(PortFolio portFolio){

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



}
