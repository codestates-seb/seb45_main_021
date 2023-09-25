package com.seb_45_main_021.unkwon.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioImage;
import com.seb_45_main_021.unkwon.image.portfolio.PortfolioTitleImage;
import com.seb_45_main_021.unkwon.image.project.ProjectImage;
import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Portfolio extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long portfolioId;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String body;

    @Column(nullable = false)
    private int view = 0;

    private int heartCount = 0;

    private int IsComment = 0;

    private int IsEmploy = 0;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @OneToMany(mappedBy = "portFolio", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    List<Comment> comments;

    private String tagA;
    private String tagB;
    private String tagC;

    private String lang;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PortfolioImage> images = new ArrayList<>();

    public void addImage(PortfolioImage image){
        this.images.add(image);
        image.setPortfolio(this);
    }
    @OneToOne(mappedBy = "portfolio", cascade = CascadeType.ALL)
    @JsonManagedReference
    private PortfolioTitleImage portfolioTitleImage;

    public void setPortfolioTitleImage(PortfolioTitleImage titleImage){
        if(this.portfolioTitleImage != null){
            this.portfolioTitleImage.setPortfolio(null);
        }
        this.portfolioTitleImage = titleImage;
        titleImage.setPortfolio(this);
    }



    public static List<Portfolio> getPortfolioIsEmployList(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .filter(portFolio -> portFolio.IsEmploy==1 )
                .collect(Collectors.toList());
    }
    public static List<Portfolio> getPortfolioIsNotEmployList(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .filter(portFolio -> portFolio.IsEmploy==0 )
                .collect(Collectors.toList());
    }

    @OneToMany(mappedBy = "portFolio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PortfolioHeart> portfolioHearts = new ArrayList<>();

}