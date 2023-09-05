package com.seb_45_main_021.unkwon.heart.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.heart.dto.HeartDto;
import com.seb_45_main_021.unkwon.heart.entity.Heart;
import com.seb_45_main_021.unkwon.heart.service.HeartService;
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
public class HeartController {

    private final HeartService heartService;
    private final PortFolioService portFolioService;
    private final MemberService memberService;
    private final PortFolioMapper mapper;



    @Autowired
    public HeartController(HeartService heartService, PortFolioService portFolioService, MemberService memberService, PortFolioMapper mapper) {
        this.heartService = heartService;
        this.portFolioService = portFolioService;
        this.memberService = memberService;


        this.mapper = mapper;
    }

    @PostMapping("/{portfolioId}")
    @ResponseBody
    public ResponseEntity heartPortfolio(@PathVariable Long portfolioId,
                                         @RequestBody HeartDto heartDto
                                         ) {
        Long memberId = Long.valueOf(heartDto.getMemberId());
        Member member = memberService.getMemberById(memberId);

        PortFolio portFolio = portFolioService.findByPortfolioId(portfolioId);
        if (portFolio == null) {
            return ResponseEntity.notFound().build();
        }

        if (!heartService.isHeartPost(member, portFolio)) {
            heartService.heart(member, portFolio);

            return ResponseEntity.ok("hearted");
        } else {
            heartService.unheart(member, portFolio);
            return ResponseEntity.ok("unhearted");
        }
    }
    @GetMapping("/likes/{memberId}")
    public ResponseEntity<Page<PortFolio>> getHeartedPortfoliosByMemberId(@PathVariable Long memberId,
                                                                          @RequestParam(required = false, defaultValue = "1") int page,
                                                                          @RequestParam(required = false, defaultValue = "12") int size ) {
            Page<PortFolio> heartedPortfolios = heartService.getHeartedPortfoliosByMemberId(memberId, PageRequest.of(page - 1, size));
            List<PortFolio> portFolios = heartedPortfolios.getContent();

            return new ResponseEntity(
                    new MultiResponseDto<>(mapper.portfoliosToPortfolioResponseDtos(portFolios),heartedPortfolios),HttpStatus.OK);

        }
}


