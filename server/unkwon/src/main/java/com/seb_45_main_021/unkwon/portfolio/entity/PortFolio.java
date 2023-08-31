package com.seb_45_main_021.unkwon.portfolio.entity;

import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PortFolio extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long portfolioId;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(nullable = false)
    private int view = 0;

    private boolean IsComment = true;

    private boolean IsEmploy = true;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "portFolio", cascade = CascadeType.REMOVE)
    List<Comment> comments;

    @Column(columnDefinition = "TEXT")
    private String tags;

}
