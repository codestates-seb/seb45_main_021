package com.seb_45_main_021.unkwon.projectcard.entity;

import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.Arrays;

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
}
