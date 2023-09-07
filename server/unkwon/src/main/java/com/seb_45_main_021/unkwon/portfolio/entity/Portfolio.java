package com.seb_45_main_021.unkwon.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
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
    private String content;

    @Column(nullable = false)
    private int view = 0;

    private int heartCount = 0;

    private boolean IsComment = true;

    private boolean IsEmploy = true;


    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @OneToMany(mappedBy = "portFolio", cascade = CascadeType.REMOVE)
    List<Comment> comments;

    @Column(columnDefinition = "TEXT")
    private String tags;

    private String lang;

    public static List<Portfolio> getPortfolioIsEmployList(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .filter(portFolio -> portFolio.IsEmploy)
                .collect(Collectors.toList());
    }
    public static List<Portfolio> getPortfolioIsNotEmployList(List<Portfolio> portFolioList){
        return portFolioList.stream()
                .filter(portFolio -> !portFolio.IsEmploy)
                .collect(Collectors.toList());
    }


    @OneToMany(mappedBy = "portFolio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PortfolioHeart> portfolioHearts = new ArrayList<>();

//    private String img;
//    private String titleImg;

}