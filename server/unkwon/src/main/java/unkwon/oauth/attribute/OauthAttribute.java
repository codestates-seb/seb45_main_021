package unkwon.oauth.attribute;

import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import com.seb_45_main_021.unkwon.oauth.memberinfo.GoogleOAuth2MemberInfo;
import com.seb_45_main_021.unkwon.oauth.memberinfo.OAuth2MemberInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

/*데이터 분기 DTO 클래스*/
@Getter
@Slf4j
public class OauthAttribute {
    private final String nameAttributeKey; // 로그인 진행 시 키가 되는 필드 값
    private final OAuth2MemberInfo oAuth2MemberInfo; // 소셜 별 로그인 유저 정보 ( 닉네임, 이메일, 프로필 URL )
    private final CustomAuthorityUtils authorityUtils;

    @Builder
    public OauthAttribute(String nameAttributeKey, OAuth2MemberInfo oAuth2MemberInfo, CustomAuthorityUtils authorityUtils) {
        this.nameAttributeKey = nameAttributeKey;
        this.oAuth2MemberInfo = oAuth2MemberInfo;
        this.authorityUtils = authorityUtils;
    }

    // attributes : OAuth 서비스 유저 정보
    public static OauthAttribute of(SocialType socialType,
                                    String userNameAttributeName, Map<String, Object> attributes,
                                    CustomAuthorityUtils authorityUtils){
        return ofGoogle(userNameAttributeName, attributes, authorityUtils);
    }

    public static OauthAttribute ofGoogle(String userAttributeName, Map<String, Object> attributes, CustomAuthorityUtils authorityUtils){
        return OauthAttribute.builder()
                .nameAttributeKey(userAttributeName)
                .oAuth2MemberInfo(new GoogleOAuth2MemberInfo(attributes))
                .authorityUtils(authorityUtils)
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
