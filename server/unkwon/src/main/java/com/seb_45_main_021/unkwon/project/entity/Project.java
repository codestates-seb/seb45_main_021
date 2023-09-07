package com.seb_45_main_021.unkwon.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
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
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectId;

    @Column(length = 30, nullable = false)
    private String title;

    private int totalPeople; // 모집 희망 인원

//    private List<Long> joinPeople; // 수락된 인원

//    @Transient // JPA 가 데이터베이스와 매핑하지 않음을 의미
//    private List<Long> requestPeople; // 신청한 인원

    @OneToMany(mappedBy = "project")
    private List<ProjectStatus> projectStatuses;

    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> joinPeople;

    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> requestPeople;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    private String closedAt; // 마감일 (유저 입력)

    @Column(columnDefinition = "TEXT")
    private String tags;

    private String lang;

    @Lob // 속성이 큰 오브젝트나 텍스트 데이터를 포함하고 있을 경우, Large Object 로 데이터베이스에 저장
    private String body;

//    private List<Image> images; // 이미지

    private String description;

    @Column(nullable = false)
    private int view;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectHeart> projectHearts;

    private int heartCount = 0;

    @Column(name = "heart_at")
    private LocalDateTime heartAt; // 프로젝트가 좋아요를 받은 날짜 및 시간

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

}
