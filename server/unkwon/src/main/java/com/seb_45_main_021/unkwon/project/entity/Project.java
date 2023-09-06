package com.seb_45_main_021.unkwon.project.entity;

import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectId; // 프로젝트 ID

//    private String author; // 작성자

    private String title; // 프로젝트명

    private int totalPeople; // 모집 희망 인원

//    @OneToMany(mappedBy = "project")
//    private List<ProjectJoinPeople> projectJoinPeople = new ArrayList<>(); // 모집된 인원

    @Transient // JPA 가 데이터베이스와 매핑하지 않음을 의미
    private List<Long> requestPeople;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt; // 게시일

    @LastModifiedDate
    private LocalDateTime modifiedAt; // 수정일

    private LocalDateTime closedAt; // 마감일 (유저 입력)

//    private List<Tag> tag = new ArrayList<>(); // 태그

//    private List<Image> images; // 이미지

    private String language; // 언어

    @Lob // 속성이 큰 오브젝트나 텍스트 데이터를 포함하고 있을 경우, Large Object 로 데이터베이스에 저장
    private String body; // 기획서

    private String description; // 상세내용

    private int heartCount = 0;

    @Column(name = "heart_at")
    private LocalDateTime heartAt; // 포트폴리오가 좋아요를 받은 날짜 및 시간

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

}
