package unkwon.member.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb_45_main_021.unkwon.audit.Auditable;
import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.entity.ProjectStatus;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.access.AccessDeniedException;

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
    @Column(nullable = false, updatable = false)
    private String email; // 이메일(아이디)

    @Column(length = 100) // 암호화로 인한 문자열 길이 설정, 소셜 로그인의 경우 비밀번호가 없으므로 null 허용
    private String password; // 비밀번호

    @Column(nullable = false)
    private String userName; // 닉네임

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles; // 사용권한

    private String refreshToken; // 로그인 시 생성되는 RefreshToken

    /** 사용자 선택 입력 정보 **/
    @Column(length = 200)
    private String aboutMe; // 자기 소개

    private String userImgUrl; // 이미지 URL

    private int age; // 사용자 나이

    private boolean isWorking;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // 회원가입 방식 (직접 회원가입, GOOGLE, GITHUB)

    /** 사용자 매핑 리스트 **/

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OrderBy("created_at desc")
    List<ProjectCard> projectCardList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @OrderBy("created_at desc") // 최신순으로 정렬
    @JsonManagedReference
    List<Portfolio> portfolios = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonIgnore
    @OrderBy("created_at desc") // 최신순으로 정렬
    List<Project> projects = new ArrayList<>(); // 내가 쓴 프로젝트 게시글

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PortfolioHeart> portfolioHearts;

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProjectHeart> projectHearts;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProjectStatus> projectStatuses;


    public void setProjectCardList(ProjectCard projectCard){projectCardList.add(projectCard);}

    public void updatePassword(String newPassword){
        this.password = newPassword;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    // 회원 가입 생성자
    public Member(String email, String password, String userName, List<String> roles, String userImgUrl, SocialType socialType) {
        this.email = email;
        this.password = password;
        this.userName = userName;
        this.roles = roles;
        this.userImgUrl = userImgUrl;
        this.socialType = socialType;
    }

    // OAuth2 회원 가입 생성자
    public Member(String email, String userName, List<String> roles, String userImgUrl, SocialType socialType) {
        this.email = email;
        this.userName = userName;
        this.roles = roles;
        this.userImgUrl = userImgUrl;
        this.socialType = socialType;
    }

    public boolean refreshTokenIsNull(){
        return this.refreshToken == null;
    }
    public boolean compareRefreshToken(String refreshToken) {return this.refreshToken.equals(refreshToken);}
    public void setTag(String[] tags) {this.tags = Arrays.toString(tags);}

    // 구글에서 한번 정보를 가져온 이후로 업데이트 주도권을 우리 서버에서 가질것인지
    // 아니면 구글 업데이트도 전부 반영해줄것인지
    public void updateUsernameAndImgUrl(String userName, String userImgUrl){
        this.userName = userName;
        this.userImgUrl = userImgUrl;
    }

    public void checkMemberId(MemberInfo memberInfo){
        if(this.memberId != memberInfo.getMemberId()) throw new AccessDeniedException(ExceptionCode.DIFFERENT_MEMBER.getMessage());
    }
}
