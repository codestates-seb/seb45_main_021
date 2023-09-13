package com.seb_45_main_021.unkwon.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.image.ProjectImage;
import com.seb_45_main_021.unkwon.image.ProjectTitleImage;
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
@EntityListeners(AuditingEntityListener.class)
public class Project extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectId;

    @Column(length = 30, nullable = false)
    private String title;

    private int totalPeople; // 모집 희망 인원

    @OneToMany(mappedBy = "project")
    private List<ProjectStatus> projectStatuses;

    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> joinPeople;

    @Column
    @ElementCollection(targetClass=Long.class)
    private List<Long> requestPeople;


//    private LocalDate closedAt;


    @Column(columnDefinition = "TEXT")
    private String[] tags;

    private String lang;

    @Lob // 속성이 큰 오브젝트나 텍스트 데이터를 포함하고 있을 경우, Large Object 로 데이터베이스에 저장
    private String body;

//    private List<Image> images; // 이미지

    private String description;

    @Column(nullable = false)
    private int view;

    private int heartCount = 0;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToMany(mappedBy = "portFolio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PortfolioHeart> portfolioHearts = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProjectImage> images = new ArrayList<>();

    public void addImage(ProjectImage image) {
        this.images.add(image);
        image.setProject(this);

    }

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private ProjectTitleImage projectTitleImage;

    public void setProjectTitleImage(ProjectTitleImage titleImage) {
        if (this.projectTitleImage != null) {
            this.projectTitleImage.setProject(null);
        }
        this.projectTitleImage = titleImage;
        titleImage.setProject(this);
    }
}
