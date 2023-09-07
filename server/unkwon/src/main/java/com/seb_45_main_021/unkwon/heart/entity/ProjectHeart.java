package com.seb_45_main_021.unkwon.heart.entity;

import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectHeart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectHeartId;

    private boolean status = false;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    public ProjectHeart(boolean status,
                          Member member,
                          Project project) {
        this.status = status;
        this.member = member;
        this.project = project;
    }
}
