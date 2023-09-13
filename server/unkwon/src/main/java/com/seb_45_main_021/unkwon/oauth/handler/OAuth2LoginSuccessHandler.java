package com.seb_45_main_021.unkwon.oauth.handler;

import com.google.gson.Gson;
import com.seb_45_main_021.unkwon.auth.jwt.JwtTokenizer;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.heart.repository.PortfolioHeartRepository;
import com.seb_45_main_021.unkwon.heart.repository.ProjectHeartRepository;
import com.seb_45_main_021.unkwon.member.dto.response.LoginResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final ProjectHeartRepository projectHeartRepository;
    private final PortfolioHeartRepository portfolioHeartRepository;
    public static final String REDIRECT_URI = "http://localhost:3000/login/redirect";

    private static final String GOOGLE = "GOOGLE";
    private static final String GITHUB = "GITHUB";

    // http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/login/redirect 요청 url
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 로그인 성공");
        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

        SocialType socialType = getSocialType(response.getHeader("socialType"));
        String email = (String) oAuth2User.getAttributes().get("email");
        Member member = findMemberByEmailAndSocialType(email, socialType);
        // 토큰 생성
        // 토큰 헤더 저장 및 DB 저장
        setTokenToResponse(response, member);
        setMemberToResponse(response, member);
        getRedirectStrategy().sendRedirect(request, response, getRedirectUri(REDIRECT_URI));
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response){
        String redirectUri = request.getParameter(REDIRECT_URI);

        log.info(redirectUri);
        return redirectUri;
    }

    private String getRedirectUri(String targetUri){
        String redirectUri = UriComponentsBuilder.fromUriString(targetUri)
                .build().toUriString();
        log.info("URI : " + redirectUri);
        return redirectUri;
    }


    private Member findMemberByEmailAndSocialType(String email, SocialType socialType){
        return memberRepository.findBySocialTypeAndEmail(socialType, email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
    private void setMemberToResponse(HttpServletResponse response, Member member) throws IOException{
        LoginResponseDto responseDto = new LoginResponseDto(member.getMemberId(),
                member.getUserName(),
                member.getUserImgUrl(),
                member.getSocialType(),
                portfolioHeartRepository.findByMember(member),
                projectHeartRepository.findByMember(member));

        Gson gson = new Gson();
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(responseDto, LoginResponseDto.class));
    }

    private void setTokenToResponse(HttpServletResponse response, Member member){
        String accessToken = jwtTokenizer.delegateAccessToken(member);
        String refreshToken = jwtTokenizer.delegateRefreshToken(member);

        response.setHeader("accessToken", accessToken);
        response.setHeader("refreshToken", refreshToken);

        member.setRefreshToken(refreshToken);

        memberRepository.save(member);
    }

    private SocialType getSocialType(String registrationId){
        if(GOOGLE.equals(registrationId)){
            return SocialType.GOOGLE;
        }
        return SocialType.GITHUB;
    }

}
