package com.seb_45_main_021.unkwon.projectcard.entity;

import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import lombok.*;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectCard extends Auditable {
    // 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectCardId;


    // 태그
    @Column(nullable = false, columnDefinition = "TEXT")
    private String tag;

    // 연락망
    @Column(length = 13, nullable = false)
    private String tell;

    @Column(nullable = false)
    private String aboutMe;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "projectStatusId")
    private ProjectStatus projectStatus;

    public ProjectCard(String tell, String aboutMe, Member member, String[] tags) {
        this.tell = tell;
        this.aboutMe = aboutMe;
        this.member = member;
        setTag(tags);
    }

    public void setTag(String[] tags){
        this.tag = Arrays.toString(tags);
    }
    public static List<ProjectCard> changeLocation(List<ProjectCard> projectCardList){
        if(projectCardList.size() > 1){ Collections.swap(projectCardList, 0, 1); }
        return projectCardList;
    }
}
