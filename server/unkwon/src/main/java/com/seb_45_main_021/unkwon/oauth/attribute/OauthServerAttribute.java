package com.seb_45_main_021.unkwon.oauth.attribute;

import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import com.seb_45_main_021.unkwon.oauth.memberinfo.GithubOAuth2MemberInfo;
import com.seb_45_main_021.unkwon.oauth.memberinfo.GoogleOAuth2MemberInfo;
import com.seb_45_main_021.unkwon.oauth.memberinfo.OAuth2MemberInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@Getter
@Slf4j
public class OauthServerAttribute {
    private final OAuth2MemberInfo oAuth2MemberInfo; // 소셜 별 로그인 유저 정보 ( 닉네임, 이메일, 프로필 URL )
    private final CustomAuthorityUtils authorityUtils;
    private final SocialType socialType;

    @Builder
    public OauthServerAttribute(OAuth2MemberInfo oAuth2MemberInfo, CustomAuthorityUtils authorityUtils, SocialType socialType) {
        this.oAuth2MemberInfo = oAuth2MemberInfo;
        this.authorityUtils = authorityUtils;
        this.socialType = socialType;
    }

    // attributes : OAuth 서비스 유저 정보
    public static OauthServerAttribute of(SocialType socialType,
                                    Map<String, Object> attributes,
                                    CustomAuthorityUtils authorityUtils){
        if(socialType.equals(SocialType.GOOGLE)) return ofGoogle(attributes, authorityUtils, socialType);
        else return ofGithub(attributes, authorityUtils, socialType);
    }

    public static OauthServerAttribute ofGoogle(Map<String, Object> attributes, CustomAuthorityUtils authorityUtils, SocialType socialType){
        return OauthServerAttribute.builder()
                .oAuth2MemberInfo(new GoogleOAuth2MemberInfo(attributes))
                .authorityUtils(authorityUtils)
                .socialType(socialType)
                .build();
    }

    public static OauthServerAttribute ofGithub(Map<String, Object> attributes, CustomAuthorityUtils authorityUtils, SocialType socialType){
        return OauthServerAttribute.builder()
                .oAuth2MemberInfo(new GithubOAuth2MemberInfo(attributes))
                .authorityUtils(authorityUtils)
                .socialType(socialType)
                .build();
    }

    public Member toEntity(SocialType socialType, OAuth2MemberInfo oAuth2MemberInfo){
        String email = oAuth2MemberInfo.getEmail();
        log.info(email);
        log.info(oAuth2MemberInfo.getImageUrl());
        return new Member(
                email,
                oAuth2MemberInfo.getUsername(),
                List.of("USER"),
                oAuth2MemberInfo.getImageUrl(),
                socialType
        );
    }
}
