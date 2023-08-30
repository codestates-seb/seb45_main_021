package com.seb_45_main_021.unkwon.portfolio.service;

import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.portfolio.repository.PortFolioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sound.sampled.Port;
import java.util.Optional;

@Service
@Transactional
public class PortFolioService {
    private final PortFolioRepository portFolioRepository;

    public PortFolioService(PortFolioRepository portFolioRepository) {
        this.portFolioRepository = portFolioRepository;
    }

    public PortFolio findByPortfolioId(long portfolioId){
        Optional<PortFolio> optionalPortFolio = portFolioRepository.findById(portfolioId);
        PortFolio findPortfolio = optionalPortFolio
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.PORTFOLIO_NOT_FOUND));

        return findPortfolio;
    }

    public PortFolio createPortfolio(PortFolio portFolio){

        return portFolioRepository.save(portFolio);
    }

    public PortFolio updatePortfolio(PortFolio portFolio){

        PortFolio findPortfolio = findByPortfolioId(portFolio.getPortfolioId());

        Optional.ofNullable(portFolio.getTitle())
                .ifPresent(title -> findPortfolio.setTitle(title));
        Optional.ofNullable(portFolio.getContent())
                .ifPresent(content -> findPortfolio.setContent(content));

        return portFolioRepository.save(findPortfolio);
    }

    public PortFolio findPortfolio(long portfolioId){
        PortFolio findPortfolio = findByPortfolioId(portfolioId);

        findPortfolio.setView(findPortfolio.getView() + 1);

        return findPortfolio;
    }

    public Page<PortFolio> findPortfolios(int page, int size){

        return portFolioRepository.findAll(
                PageRequest.of(page, size, Sort.by("portfolioId").descending()));
    }

    public Page<PortFolio> findPortfoliosView(int page, int size){

        return portFolioRepository.findAll(
                PageRequest.of(page, size, Sort.by("view").descending()));
    }
    public void deletePortfolio(long portfolioId){
        PortFolio portFolio = findByPortfolioId(portfolioId);

        portFolioRepository.delete(portFolio);
    }

}
