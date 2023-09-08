package com.seb_45_main_021.unkwon.heart.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.heart.dto.PortfolioHeartDto;
import com.seb_45_main_021.unkwon.heart.service.PortfolioHeartService;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import com.seb_45_main_021.unkwon.portfolio.dto.PortfolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.portfolio.mapper.PortfolioMapper;
import com.seb_45_main_021.unkwon.portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/portfolio/hearts")
public class PortfolioHeartController {

    private final PortfolioHeartService portfolioHeartService;
    private final PortfolioService portfolioService;
    private final MemberService memberService;
    private final PortfolioMapper mapper;

    @Autowired
    public PortfolioHeartController(PortfolioHeartService portfolioHeartService, PortfolioService portfolioService, MemberService memberService, PortfolioMapper mapper) {
        this.portfolioHeartService = portfolioHeartService;
        this.portfolioService = portfolioService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/{portfolioId}")
    @ResponseBody
    public ResponseEntity heartPortfolio(@PathVariable Long portfolioId,
                                         @RequestBody PortfolioHeartDto portfolioHeartDto) {
        Long memberId = Long.valueOf(portfolioHeartDto.getMemberId());
        Member member = memberService.findVerifiedMember(memberId);

        Portfolio portfolio = portfolioService.findByPortfolioId(portfolioId);
        if (portfolio == null) {

            return ResponseEntity.notFound().build();
        }

        if (!portfolioHeartService.isHeartPost(member, portfolio)) {
            portfolioHeartService.heart(member, portfolio);

            return ResponseEntity.ok("hearted");
        } else {
            portfolioHeartService.unheart(member, portfolio);
            return ResponseEntity.ok("unhearted");
        }
    }
    @GetMapping("/memberLikes/{memberId}")
    public ResponseEntity<Page<Portfolio>> getHeartedPortfoliosByMemberId(@PathVariable Long memberId,
                                                                          @RequestParam(required = false, defaultValue = "1") int page,
                                                                          @RequestParam(required = false, defaultValue = "12") int size ) {
        Page<Portfolio> heartedPortfolios = portfolioHeartService.getHeartedPortfoliosByMemberId(memberId, PageRequest.of(page - 1, size));

        List<Portfolio> portfolios = heartedPortfolios.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.portfoliosToPortfolioResponseDtos(portfolios),heartedPortfolios),HttpStatus.OK);
    }

    @GetMapping("/weekly-top")
    public ResponseEntity<List<PortfolioDto.TopResponse>> getTop10PortfoliosByHeartsLast7Days() {
        List<Portfolio> top10Portfolios = portfolioHeartService.getTop10PortfoliosByHeartsLast7Days();
        List<PortfolioDto.TopResponse> portfolioDtosTopResponse = top10Portfolios.stream()
                .map(portfolio -> PortfolioDto.TopResponse.builder()
                        .portfolioId(portfolio.getPortfolioId())
                        .title(portfolio.getTitle())
                        .build())
                .collect(Collectors.toList());

        return new ResponseEntity<>(portfolioDtosTopResponse, HttpStatus.OK);
    }

//    @GetMapping("/portfolioLikes/{portfolioId}")
//    public void getPortfolioByMemberId(@PathVariable long portfolioId){
//        PortFolio portFolio = new PortFolio();
//        portFolio.setPortfolioId(portfolioId);
//
//        System.out.println(heartService.getHeartByPortfolio(portFolio).size());
//    }
}
