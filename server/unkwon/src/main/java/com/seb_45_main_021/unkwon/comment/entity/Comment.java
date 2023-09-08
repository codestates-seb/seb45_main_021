package com.seb_45_main_021.unkwon.comment.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private Long commentId;

    @Column(length = 500, nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PORTFOLIO_ID")
    @JsonBackReference
    private Portfolio portFolio;
}
