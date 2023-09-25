package unkwon.portfolio.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.dto.SingleResponseDto;
import com.seb_45_main_021.unkwon.portfolio.dto.PortfolioDto;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.portfolio.mapper.PortfolioMapper;
import com.seb_45_main_021.unkwon.portfolio.service.PortfolioService;
import com.seb_45_main_021.unkwon.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/portfolios")
@Validated
public class PortfolioController {

    private final PortfolioService portfolioService;

    private final PortfolioMapper mapper;

    private final String PORTFOLIO_DEFAULT_URL = "/portfolios";

    public PortfolioController(PortfolioService portfolioService, PortfolioMapper mapper) {
        this.portfolioService = portfolioService;
        this.mapper = mapper;
    }

    //포트폴리오 생성
    @PostMapping
    public ResponseEntity postPortfolio(@RequestParam("portfolio") String portfolioAsString,
                                        @RequestParam("titleImageFile") MultipartFile titleImageFile,
                                        @RequestParam(value = "imageFile", required = false) List<MultipartFile> imageFiles) {
        try {
            PortfolioDto.Post portfolioPostDto = new ObjectMapper().readValue(portfolioAsString, PortfolioDto.Post.class);

            Portfolio portFolio = portfolioService.createPortfolio(mapper.portfolioPostDtoToPortfolio(portfolioPostDto),titleImageFile, imageFiles);

            URI location = UriCreator.createUri(PORTFOLIO_DEFAULT_URL, portFolio.getPortfolioId());

            return ResponseEntity.created(location).body(mapper.portfolioToPortfolioDetailResponseDto(portFolio));
        }
        catch (JsonProcessingException e){
            e.printStackTrace();

            return ResponseEntity.badRequest().body("Invalid JSON format.");
        }
    }

    //포트폴리오 수정
    @PatchMapping("/{portfolio-id}")
    public ResponseEntity updatePortfolio(@PathVariable("portfolio-id")@Positive long portfolioId,
                                          @RequestParam("portfolio") String portfolioAsString,
                                          @RequestParam(value = "titleImageFile", required = false) MultipartFile titleImageFile,
                                          @RequestParam(value = "titleImageUrl", required = false) String titleImageUrl,
                                          @RequestParam(value = "imageFile", required = false) List<MultipartFile> imageFiles,
                                          @RequestParam(value = "imageUrls", required = false) List<String> imageUrls,
                                          UsernamePasswordAuthenticationToken token) {

        MemberInfo memberInfo = (MemberInfo) token.getPrincipal();
        try {
                PortfolioDto.Patch portfolioPatchDto = new ObjectMapper().readValue(portfolioAsString, PortfolioDto.Patch.class);
            portfolioPatchDto.setPortfolioId(portfolioId);

            Portfolio portFolio = portfolioService.updatePortfolio(mapper.portfolioPatchDtoToPortfolio(portfolioPatchDto),
                    titleImageFile, titleImageUrl, imageFiles, imageUrls, memberInfo);

            return new ResponseEntity<>(mapper.portfolioToPortfolioDetailResponseDto(portFolio), HttpStatus.OK);
        }
        catch (JsonProcessingException e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid JSON format."+e.getMessage());
        }
    }

    //포트폴리오 상세조회
    @GetMapping("/{portfolio-id}")
    public ResponseEntity getPortfolio (@PathVariable("portfolio-id") @Positive long portfolioId){

        Portfolio portFolio = portfolioService.findPortfolio(portfolioId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        mapper.portfolioToPortfolioDetailResponseDto(portFolio)), HttpStatus.OK);
    }

    //포트폴리오 검색기능
    @GetMapping("/search")
    public ResponseEntity searchPortfolios(@RequestParam(required = false)String[] tags,
                                           @RequestParam(required = false)String[] lang,
                                           @PageableDefault(size = 12,page =0,sort = "portfolioId",direction = Sort.Direction.DESC)Pageable pageable
                                           ){
        Page<Portfolio> result = portfolioService.findPortfolios(tags, lang, pageable);

        List<PortfolioDto.Response> portfolioResponseDtos = mapper.portfoliosToPortfolioResponseDtos(result.getContent());

        return new ResponseEntity<>(
                new MultiResponseDto<>(portfolioResponseDtos,result),HttpStatus.OK);

    }

    @GetMapping("/employ/search")
    public ResponseEntity employSearchPortfolios(@RequestParam(required = false)String[] tags,
                                           @RequestParam(required = false)String[] lang,
                                           @PageableDefault(size = 12,page=0,sort = "portfolioId",direction = Sort.Direction.DESC)Pageable pageable
    ){

        Page<Portfolio> result = portfolioService.findIsEmployPortfolios(tags, lang, pageable);

        List<PortfolioDto.Response> portfolioResponseDtos = mapper.portfoliosToPortfolioResponseDtos(result.getContent());

        return new ResponseEntity<>(
                new MultiResponseDto<>(portfolioResponseDtos,result),HttpStatus.OK);

    }
    //포트폴리오 Top10
    @GetMapping("/top10")
    public ResponseEntity getTop10PortfoliosByLikes(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size) {

        PageRequest pageable = PageRequest.of(page, size);
        Page<Portfolio> result = portfolioService.getTop10PortfoliosByLikes(pageable);

        List<PortfolioDto.Response> portfolioResponseDtos = mapper.portfoliosToPortfolioResponseDtos(result.getContent());

        return new ResponseEntity<>(
                new MultiResponseDto<>(portfolioResponseDtos,result),HttpStatus.OK);
    }

    //포트폴리오 삭제
    @DeleteMapping("/{portfolio-id}")
    public ResponseEntity deletePortfolio(@PathVariable("portfolio-id") @Positive long portfolioId,
                                          UsernamePasswordAuthenticationToken token){

        MemberInfo memberInfo = (MemberInfo) token.getPrincipal();

        portfolioService.deletePortfolio(portfolioId,memberInfo);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}