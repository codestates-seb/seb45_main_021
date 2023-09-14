package com.seb_45_main_021.unkwon.portfolio.service;

import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.image.S3Service;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioImage;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioImageRepository;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioTitleImage;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioTitleRepository;
import com.seb_45_main_021.unkwon.image.project.ProjectImage;
import com.seb_45_main_021.unkwon.image.project.ProjectTitleImage;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.portfolio.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final PortfolioTitleRepository portfolioTitleRepository;
    private final PortfolioImageRepository portfolioImageRepository;
    @Autowired
    private S3Service s3Service;

    public PortfolioService(PortfolioRepository portfolioRepository, PortfolioTitleRepository portfolioTitleRepository, PortfolioImageRepository portfolioImageRepository) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioTitleRepository = portfolioTitleRepository;
        this.portfolioImageRepository = portfolioImageRepository;
    }

    public Portfolio findByPortfolioId(long portfolioId){
        Optional<Portfolio> optionalPortFolio = portfolioRepository.findById(portfolioId);
        Portfolio findPortfolio = optionalPortFolio
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_FOUND));

        return findPortfolio;
    }




    public Portfolio createPortfolio(Portfolio portfolio, MultipartFile titleImageFile, List<MultipartFile> imageFiles){
        String bucketName = s3Service.getBucketName();

        // 타이틀 이미지 로직
        String titleFileName = s3Service.uploadFile(titleImageFile); // S3 업로드
        String titleImageUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, titleFileName); // URL 생성
        PortfolioTitleImage titleImage = new PortfolioTitleImage(); // 타이틀 이미지 객체 생성
        titleImage.setImageUrl(titleImageUrl); // URL 저장
        portfolio.setPortfolioTitleImage(titleImage); // 프로젝트에 반영

        if (imageFiles != null && !imageFiles.isEmpty()) {
            for (MultipartFile imageFile : imageFiles) { // 배열로 받은 이미지 순회
                String fileName = s3Service.uploadFile(imageFile); // S3 업로드
                String imageUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName); // URL 생성

                PortfolioImage image = new PortfolioImage(); // 이미지 객체 생성
                image.setImageUrl(imageUrl); // URL 저장
                portfolio.addImage(image); // 프로젝트에 반영
            }
        }

        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolio(Portfolio portFolio,
                                     MultipartFile titleImageFile,
                                     String titleImageUrl,
                                     List<MultipartFile> imageFiles,
                                     List<String> imageUrls,
                                     MemberInfo memberInfo) {
        // 해당 포트폴리오의 Id 로 존재하는 프로젝트인지 검증
        Portfolio findPortfolio = findByPortfolioId(portFolio.getPortfolioId());
        // 작성자와 수정자 memberId 일치 검증
        Member findMember = findPortfolio.getMember();
        findMember.checkMemberId(memberInfo);


        //수정된 정보 업데이트
        Optional.ofNullable(portFolio.getTitle())
                .ifPresent(title -> findPortfolio.setTitle(title));
        Optional.ofNullable(portFolio.getBody())
                .ifPresent(content -> findPortfolio.setBody(content));
        Optional.ofNullable(portFolio.getTagA())
                .ifPresent(tagA -> findPortfolio.setTagA(tagA));
        Optional.ofNullable(portFolio.getTagB())
                .ifPresent(tagB -> findPortfolio.setTagA(tagB));
        Optional.ofNullable(portFolio.getTagC())
                .ifPresent(tagC -> findPortfolio.setTagA(tagC));
        Optional.ofNullable(portFolio.getLang())
                .ifPresent(lang-> findPortfolio.setLang(lang));
        Optional.ofNullable(portFolio.isIsEmploy())
                .ifPresent(IsEmploy -> findPortfolio.setIsEmploy(IsEmploy));
        Optional.ofNullable(portFolio.isIsComment())
                .ifPresent(IsComment -> findPortfolio.setIsComment(IsComment));

        // 타이틀 이미지 삭제
        if(titleImageUrl != null) { // 타이틀 이미지 URL 을 받았다면
            s3Service.deleteFile(titleImageUrl);  // S3 에서 삭제
            portfolioTitleRepository.deleteByImageUrl(titleImageUrl); // DB 에서 삭제
        }
        // 타이틀 이미지 추가
        if(titleImageFile != null && !titleImageFile.isEmpty()) { // 타이틀 이미지 파일을 받았다면
            String titleFileName = s3Service.uploadFile(titleImageFile); // S3 업로드
            String newTitleImageUrl = String.format("https://%s.s3.amazonaws.com/%s", s3Service.getBucketName(), titleFileName); // URL 생성
            PortfolioTitleImage titleImage = new PortfolioTitleImage(); // 새 PortfolioTitleImage 객체 생성
            titleImage.setImageUrl(newTitleImageUrl); // imageUrl 저장
            findPortfolio.setPortfolioTitleImage(titleImage); // 프로젝트에 PortfolioTitleImage 객체 저장
        }
        // 삭제 이미지 URL 배열을 받았다면
        if(imageUrls != null && !imageUrls.isEmpty()) {
            for(String imageUrl : imageUrls) { // for 문 돌려서 하나씩
                s3Service.deleteFile(imageUrl);  // S3 에서 삭제하기
                portfolioImageRepository.deleteByImageUrl(imageUrl); // DB 에서 삭제
            }
        }
        // 나머지 이미지 업데이트 로직
        if(imageFiles != null && !imageFiles.isEmpty()) { // 이미지 파일 배열을 받았다면
            for (MultipartFile imageFile : imageFiles) { // for 문 돌려서 하나씩
                String fileName = s3Service.uploadFile(imageFile); // S3 에 저장
                String imageUrl = String.format("https://%s.s3.amazonaws.com/%s", s3Service.getBucketName(), fileName); // URL 생성

                PortfolioImage image = new PortfolioImage(); // 새 PortfolioImage 객체 생성
                image.setImageUrl(imageUrl); // imageUrl 저장
                findPortfolio.addImage(image); // 프로젝트에 PortfolioImage 객체 저장
            }
        }
        // 수정된 정보 DB 반영
        return portfolioRepository.save(findPortfolio);
    }

    public Portfolio findPortfolio(long portfolioId){
        Portfolio findPortfolio = findByPortfolioId(portfolioId);

        findPortfolio.setView(findPortfolio.getView() + 1);

        return findPortfolio;
    }

    //조회기능 (언어,태그,인기순)
    public Page<Portfolio> findPortfolios(String[] tags,String[] lang, Pageable pageable){

        if(tags != null && lang != null){

            StringBuilder tagsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = tags[i];
                tagsLikeQueryBuilder.append(temp);
            }

            StringBuilder langsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = lang[i];
                langsLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTagsAndLang(tagsLikeQueryBuilder.toString(),langsLikeQueryBuilder.toString(),pageable);
        }
        else if(tags != null){
            Arrays.sort(tags);

            StringBuilder tagLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = tags[i];
                tagLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTags(tagLikeQueryBuilder.toString(),pageable);
        }
        else if(lang != null){
            Arrays.sort(lang);

            StringBuilder langLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp =lang[i];
                langLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByLang(langLikeQueryBuilder.toString(),pageable);
        }
        else {
            return portfolioRepository.findAll(pageable);
        }
    }

    //조회기능 + 구직여부 (언어,태그,인기순)
    public Page<Portfolio> findIsEmployPortfolios(String[] tags,String[] lang, Pageable pageable){

        if(tags != null && lang != null){
            Arrays.sort(tags);
            Arrays.sort(lang);

            StringBuilder tagsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp =tags[i];
                tagsLikeQueryBuilder.append(temp);
            }

            StringBuilder langsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp =lang[i];
                langsLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTagsAndLangAndIsEmploy(tagsLikeQueryBuilder.toString(),langsLikeQueryBuilder.toString(),pageable);
        }
        else if(tags != null){
            Arrays.sort(tags);

            StringBuilder tagLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp =tags[i];
                tagLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTagsAndIsEmploy(tagLikeQueryBuilder.toString(),pageable);
        }
        else if(lang != null){
            Arrays.sort(lang);

            StringBuilder langLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp =lang[i];
                langLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByLangAndIsEmploy(langLikeQueryBuilder.toString(),pageable);
        }
        else {
            return portfolioRepository.findEmployedPortfolios(pageable);
        }
    }

    // 좋아요 수가 가장 많은 포트폴리오 10개 가져오기
    public Page<Portfolio> getTop10PortfoliosByLikes(Pageable pageable) {
        return portfolioRepository.findTop10ByOrderByHeartCountDesc(pageable);
    }

    public void deletePortfolio(long portfolioId,MemberInfo memberInfo){
        Portfolio portfolio = findByPortfolioId(portfolioId);

        Member findMember = portfolio.getMember();

        findMember.checkMemberId(memberInfo);

        portfolioRepository.delete(portfolio);
    }
}