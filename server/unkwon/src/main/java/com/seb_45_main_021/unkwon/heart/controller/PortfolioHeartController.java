package com.seb_45_main_021.unkwon.heart.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.heart.dto.PortfolioHeartDto;
import com.seb_45_main_021.unkwon.heart.service.PortfolioHeartService;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.portfolio.mapper.PortFolioMapper;
import com.seb_45_main_021.unkwon.portfolio.service.PortFolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hearts")
public class PortfolioHeartController {

    private final PortfolioHeartService portfolioHeartService;
    private final PortFolioService portFolioService;
    private final MemberService memberService;
    private final PortFolioMapper mapper;



    @Autowired
    public PortfolioHeartController(PortfolioHeartService portfolioHeartService, PortFolioService portFolioService, MemberService memberService, PortFolioMapper mapper) {
        this.portfolioHeartService = portfolioHeartService;
        this.portFolioService = portFolioService;
        this.memberService = memberService;


        this.mapper = mapper;
    }

    @PostMapping("/{portfolioId}")
    @ResponseBody
    public ResponseEntity heartPortfolio(@PathVariable Long portfolioId,
                                         @RequestBody PortfolioHeartDto portfolioHeartDto
<<<<<<< HEAD
    ) {
=======
                                         ) {
>>>>>>> serverDev
        Long memberId = Long.valueOf(portfolioHeartDto.getMemberId());
        Member member = memberService.findVerifiedMember(memberId);

        PortFolio portFolio = portFolioService.findByPortfolioId(portfolioId);
        if (portFolio == null) {
            return ResponseEntity.notFound().build();
        }

        if (!portfolioHeartService.isHeartPost(member, portFolio)) {
            portfolioHeartService.heart(member, portFolio);

            return ResponseEntity.ok("hearted");
        } else {
            portfolioHeartService.unheart(member, portFolio);
            return ResponseEntity.ok("unhearted");
        }
    }
    @GetMapping("/memberLikes/{memberId}")
    public ResponseEntity<Page<PortFolio>> getHeartedPortfoliosByMemberId(@PathVariable Long memberId,
                                                                          @RequestParam(required = false, defaultValue = "1") int page,
                                                                          @RequestParam(required = false, defaultValue = "12") int size ) {
<<<<<<< HEAD
        Page<PortFolio> heartedPortfolios = portfolioHeartService.getHeartedPortfoliosByMemberId(memberId, PageRequest.of(page - 1, size));
        List<PortFolio> portFolios = heartedPortfolios.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.portfoliosToPortfolioResponseDtos(portFolios),heartedPortfolios),HttpStatus.OK);
=======
            Page<PortFolio> heartedPortfolios = portfolioHeartService.getHeartedPortfoliosByMemberId(memberId, PageRequest.of(page - 1, size));
            List<PortFolio> portFolios = heartedPortfolios.getContent();

            return new ResponseEntity(
                    new MultiResponseDto<>(mapper.portfoliosToPortfolioResponseDtos(portFolios),heartedPortfolios),HttpStatus.OK);
>>>>>>> serverDev
    }

//    @GetMapping("/portfolioLikes/{portfolioId}")
//    public void getPortfolioByMemberId(@PathVariable long portfolioId){
//        PortFolio portFolio = new PortFolio();
//        portFolio.setPortfolioId(portfolioId);
//
//        System.out.println(heartService.getHeartByPortfolio(portFolio).size());
//    }


<<<<<<< HEAD
}
=======
}


>>>>>>> serverDev
