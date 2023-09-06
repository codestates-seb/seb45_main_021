package com.seb_45_main_021.unkwon.heart.entity;

import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioHeart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;

    private boolean status = false;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PORTFOLIO_ID")
    private PortFolio portFolio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    public PortfolioHeart(boolean status,
                          Member member,
                          PortFolio portFolio) {
        this.status = status;
        this.member = member;
        this.portFolio = portFolio;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> serverDev
