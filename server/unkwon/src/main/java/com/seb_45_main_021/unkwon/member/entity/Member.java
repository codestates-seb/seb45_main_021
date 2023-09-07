package com.seb_45_main_021.unkwon.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.project.entity.Project;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends Auditable {
    /** 사용자 필수 입력 정보 **/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId; // 식별자

    @Email
    @Column(nullable = false, updatable = false, unique = true)
    private String email; // 이메일(아이디)

    @Column(length = 100) // 암호화로 인한 문자열 길이 설정, 소셜 로그인의 경우 비밀번호가 없으므로 null 허용
    private String password; // 비밀번호

    @Column(nullable = false)
    private String username; // 닉네임

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles; // 사용권한

    private String refreshToken; // 로그인 시 생성되는 RefreshToken

    /** 사용자 선택 입력 정보 **/
    @Column(length = 1000)
    private String aboutMe; // 자기 소개

    private String imgUrl; // 이미지 URL

    private int age; // 사용자 나이

    private boolean isWorking;

    @Column(columnDefinition = "TEXT")
    private String tag;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // 회원가입 방식 (직접 회원가입, GOOGLE, GITHUB)

    private String socialId; // 로그인한 소셜 타입의 식별자 값 ( 일반 로그인의 경우 null )

    /** 사용자 매핑 리스트 **/
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @OrderBy("created_at desc") // 최신순으로 정렬
//    List<PortFolio> portFolioList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @OrderBy("created_at desc") // 최신순으로 정렬
//    List<Project> projectList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OrderBy("created_at desc")
    List<ProjectCard> projectCardList = new ArrayList<>();

    public void setProjectCardList(ProjectCard projectCard){projectCardList.add(projectCard);}


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    List<Portfolio> portfolios = new ArrayList<>();


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    List<Project> projects = new ArrayList<>(); // 내가 쓴 프로젝트 게시글

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PortfolioHeart> portfolioHearts;


    public void updatePassword(String newPassword){
        this.password = newPassword;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    // 회원 가입 생성자
    public Member(String email, String password, String username, List<String> roles, String imgUrl) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.roles = roles;
        this.imgUrl = imgUrl;
    }

    // OAuth2 회원 가입 생성자
    public Member(String email, String username, List<String> roles, String imgUrl, SocialType socialType, String socialId) {
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.imgUrl = imgUrl;
        this.socialType = socialType;
        this.socialId = socialId;
    }

    public boolean refreshTokenIsNull(){
        return this.refreshToken == null;
    }
    public void setTag(String[] tags) {this.tag = Arrays.toString(tags);}

    // 구글에서 한번 정보를 가져온 이후로 업데이트 주도권을 우리 서버에서 가질것인지
    // 아니면 구글 업데이트도 전부 반영해줄것인지
    public void updateUsernameAndImgUrl(String username, String imgUrl){
        this.username = username;
        this.imgUrl = imgUrl;
    }
}
