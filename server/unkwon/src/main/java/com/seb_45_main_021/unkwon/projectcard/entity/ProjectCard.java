package com.seb_45_main_021.unkwon.projectcard.entity;

import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import lombok.*;

import javax.persistence.*;
import java.util.Arrays;
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

    @Column(nullable = false)
    private String title;

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
    @JoinColumn(name = "PROJECT_STATUS_ID")
    private ProjectStatus projectStatus;

    public ProjectCard(String tell, String title, String aboutMe, Member member, String[] tags) {
        this.title = title;
        this.tell = tell;
        this.aboutMe = aboutMe;
        this.member = member;
        setTag(tags);
    }

    public void setTag(String[] tags){
        this.tag = Arrays.toString(tags);
    }
    public static List<ProjectCard> changeLocation(List<ProjectCard> projectCardList){
        while(projectCardList.size() != 3) {projectCardList.add(new ProjectCard());}
        ProjectCard temp = projectCardList.get(0);
        projectCardList.add(0, projectCardList.get(1));
        projectCardList.remove(1);
        projectCardList.add(1, temp);
        projectCardList.remove(2);
        return projectCardList;
    }
}
