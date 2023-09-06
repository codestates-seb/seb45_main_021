package com.seb_45_main_021.unkwon.member.entity;

import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Setter
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

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // 회원가입 방식 (직접 회원가입, GOOGLE, GITHUB)

    private String socialId; // 로그인한 소셜 타입의 식별자 값 ( 일반 로그인의 경우 null )

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    List<PortFolio> portfolios = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.LAZY)
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

}