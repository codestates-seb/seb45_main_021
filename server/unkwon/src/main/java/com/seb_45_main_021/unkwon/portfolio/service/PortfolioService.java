package com.seb_45_main_021.unkwon.portfolio.service;

import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.portfolio.repository.PortfolioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public Portfolio findByPortfolioId(long portfolioId){
        Optional<Portfolio> optionalPortFolio = portfolioRepository.findById(portfolioId);
        Portfolio findPortfolio = optionalPortFolio
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_FOUND));

        return findPortfolio;
    }

    public Portfolio createPortfolio(Portfolio portFolio){

        return portfolioRepository.save(portFolio);
    }

    public Portfolio updatePortfolio(Portfolio portFolio){

        Portfolio findPortfolio = findByPortfolioId(portFolio.getPortfolioId());

        Optional.ofNullable(portFolio.getTitle())
                .ifPresent(title -> findPortfolio.setTitle(title));
        Optional.ofNullable(portFolio.getContent())
                .ifPresent(content -> findPortfolio.setContent(content));
        Optional.ofNullable(portFolio.getTags())
                .ifPresent(tags -> findPortfolio.setTags(tags));
        Optional.ofNullable(portFolio.getLang())
                .ifPresent(lang-> findPortfolio.setLang(lang));
        Optional.ofNullable(portFolio.isIsEmploy())
                .ifPresent(IsEmploy -> findPortfolio.setIsEmploy(IsEmploy));
        Optional.ofNullable(portFolio.isIsComment())
                .ifPresent(IsComment -> findPortfolio.setIsComment(IsComment));

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
            Arrays.sort(tags);
            Arrays.sort(lang);

            StringBuilder tagsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = "%"+ tags[i] + "%";
                tagsLikeQueryBuilder.append(temp);
            }

            StringBuilder langsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = "%" + lang[i] + "%";
                langsLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTagsAndLang(tagsLikeQueryBuilder.toString(),langsLikeQueryBuilder.toString(),pageable);
        }
        else if(tags != null){
            Arrays.sort(tags);

            StringBuilder tagLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = "%"+ tags[i] + "%";
                tagLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTags(tagLikeQueryBuilder.toString(),pageable);
        }
        else if(lang != null){
            Arrays.sort(lang);

            StringBuilder langLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
            String temp = "%" + lang[i] + "%";
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
                String temp = "%"+ tags[i] + "%";
                tagsLikeQueryBuilder.append(temp);
            }

            StringBuilder langsLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = "%" + lang[i] + "%";
                langsLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTagsAndLangAndIsEmploy(tagsLikeQueryBuilder.toString(),langsLikeQueryBuilder.toString(),pageable);
        }
        else if(tags != null){
            Arrays.sort(tags);

            StringBuilder tagLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < tags.length; i++) {
                String temp = "%"+ tags[i] + "%";
                tagLikeQueryBuilder.append(temp);
            }
            return portfolioRepository.findByTagsAndIsEmploy(tagLikeQueryBuilder.toString(),pageable);
        }
        else if(lang != null){
            Arrays.sort(lang);

            StringBuilder langLikeQueryBuilder = new StringBuilder("");

            for (int i = 0; i < lang.length; i++) {
                String temp = "%" + lang[i] + "%";
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

    public void deletePortfolio(long portfolioId){
        Portfolio portFolio = findByPortfolioId(portfolioId);

        portfolioRepository.delete(portFolio);
    }
}
