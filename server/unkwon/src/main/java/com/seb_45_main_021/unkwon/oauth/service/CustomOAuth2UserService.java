package com.seb_45_main_021.unkwon.oauth.service;

import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.oauth.attribute.OauthAttribute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    private final HttpServletResponse response;
    private static final String GOOGLE = "google";
    private static final String GITHUB = "github";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        log.info("CustomOAuth2UserService 실행 - OAuth2 로그인 테스트 및 DB 저장 확인");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> userService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = userService.loadUser(userRequest); // OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 이를 통해 소셜 타입 정의( "google" )
        SocialType socialType = getSocialType(registrationId);
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인

        Map<String, Object> attributes = oAuth2User.getAttributes(); // API 가 제공하는 JSON 값( 유저 정보 )

        // 소셜 타입에 따라 유저 정보를 통해 객체 생성
        OauthAttribute oauthAttribute = OauthAttribute.of(socialType, userNameAttributeName, attributes, authorityUtils);

        Member member = getMember(oauthAttribute, socialType);
        response.setHeader("socialType", String.valueOf(socialType));

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRoles().get(0))),
                attributes,
                oauthAttribute.getNameAttributeKey());
    }

    private SocialType getSocialType(String registrationId){
        if(GOOGLE.equals(registrationId)){
            return SocialType.GOOGLE;
        }
        return SocialType.GITHUB;
    }

    private Member getMember(OauthAttribute attribute, SocialType socialType){
        // 소셜타입과 이메일로 회원 탐색
        Member findMember = memberRepository.
                findBySocialTypeAndEmail(socialType, attribute.getOAuth2MemberInfo().getEmail()).orElse(null);

        // 회원 가입
        if(findMember == null){
            return saveMember(attribute, socialType);
        }

        // RefreshToken 이 Null 이 아닐 경우에는 다른 곳에서 로그인 했으므로 예외 발생
        if(!findMember.refreshTokenIsNull()) throw new BusinessLogicException(ExceptionCode.STATUS_LOGIN);

        // 로그인
        return findMember;
    }

    private Member saveMember(OauthAttribute attribute, SocialType socialType){
        Member newMember = attribute.toEntity(socialType, attribute.getOAuth2MemberInfo());
        return memberRepository.save(newMember);
    }

    /** 구글 쪽에서 프로필 및 유저 네임 변경을 했을수도 있으므로 업데이트 **/
    private Member updateUsernameAndImgUrl(Member findMember, OauthAttribute attribute){
        findMember.updateUsernameAndImgUrl(attribute.getOAuth2MemberInfo().getUsername(), attribute.getOAuth2MemberInfo().getImageUrl());
        return memberRepository.save(findMember);
    }
}
