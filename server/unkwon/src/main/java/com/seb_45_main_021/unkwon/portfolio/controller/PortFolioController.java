package com.seb_45_main_021.unkwon.portfolio.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.dto.SingleResponseDto;
import com.seb_45_main_021.unkwon.portfolio.dto.PortFolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.portfolio.mapper.PortFolioMapper;
import com.seb_45_main_021.unkwon.portfolio.service.PortFolioService;
import com.seb_45_main_021.unkwon.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/portfolios")
@Validated
public class PortFolioController {

    private final PortFolioService portFolioService;

    private final PortFolioMapper mapper;

    private final String PORTFOLIO_DEFAULT_URL = "/portfolios";

    public PortFolioController(PortFolioService portFolioService, PortFolioMapper mapper) {
        this.portFolioService = portFolioService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPortfolio(@RequestBody @Valid PortFolioDto.Post portfolioPostDto){
        PortFolio portFolio = portFolioService.createPortfolio(mapper.portfolioPostDtoToPortfolio(portfolioPostDto));

        URI location = UriCreator.createUri(PORTFOLIO_DEFAULT_URL, portFolio.getPortfolioId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{portfolio-id}")
    public ResponseEntity updatePortfolio(@PathVariable("portfolio-id")@Positive long portfolioId,
                                         @Valid @RequestBody PortFolioDto.Patch portfolioPatchDto){

        portfolioPatchDto.setPortfolioId(portfolioId);

        PortFolio portFolio = portFolioService.updatePortfolio(mapper.portfolioPatchDtoToPortfolio(portfolioPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        mapper.portfolioToPortfolioDetailResponseDto(portFolio)), HttpStatus.OK);
    }

    @GetMapping("/{portfolio-id}")
    public ResponseEntity getPortfolio (@PathVariable("portfolio-id") @Positive long portfolioId){

        PortFolio portFolio = portFolioService.findPortfolio(portfolioId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        mapper.portfolioToPortfolioDetailResponseDto(portFolio)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPortfolios(@RequestParam(required = false, defaultValue = "1") int page,
                                        @RequestParam(required = false, defaultValue = "12") int size){
        Page<PortFolio> pagePortFolios = portFolioService.findPortfolios(page-1,size);
        List<PortFolio> portFolios = pagePortFolios.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.portfoliosToPortfolioResponseDtos(portFolios), pagePortFolios),HttpStatus.OK);
    }

    @GetMapping("/view")
    public ResponseEntity getPortfoliosView(@RequestParam(required = false, defaultValue = "1") int page,
                                            @RequestParam(required = false, defaultValue = "12") int size){
        Page<PortFolio> pagePortFolios = portFolioService.findPortfoliosView(page-1,size);
        List<PortFolio> portFolios = pagePortFolios.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.portfoliosToPortfolioResponseDtos(portFolios), pagePortFolios),HttpStatus.OK);
    }



    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity deletePortfolio(@PathVariable("portfolio-id") @Positive long portfolioId){

        portFolioService.deletePortfolio(portfolioId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
