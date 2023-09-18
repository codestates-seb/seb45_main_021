package com.seb_45_main_021.unkwon.oauth.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.seb_45_main_021.unkwon.auth.jwt.JwtTokenizer;
import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.heart.repository.PortfolioHeartRepository;
import com.seb_45_main_021.unkwon.heart.repository.ProjectHeartRepository;
import com.seb_45_main_021.unkwon.member.dto.response.LoginResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.oauth.attribute.OauthServerAttribute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberService {
    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String googleclientId;
    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String googleclientSecret;

    @Value("${spring.security.oauth2.client.registration.github.gitClientId}")
    private String githubclientId;
    @Value("${spring.security.oauth2.client.registration.github.gitClientSecret}")
    private String githubclientSecret;

    private final MemberRepository memberRepository;
    private final ProjectHeartRepository projectHeartRepository;
    private final PortfolioHeartRepository portfolioHeartRepository;
    private final RestTemplate restTemplate;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;

    /**회원 가입 및 로그인 **/
    public Map<String, Object> findOrSaveMember(String token, String provider){
        OauthServerAttribute oauthServerAttribute = null;

        switch(provider){
            case "google" :
                oauthServerAttribute = getGoogleData(token);
                break;
            case "github":
                oauthServerAttribute = getGithubData(token);
                break;
            default:
        }

        boolean isSignUp = false;
        Integer httpStatus = HttpStatus.OK.value();
        Map<String, Object> result = new HashMap<>();
        Optional<Member> findMember = memberRepository.findBySocialTypeAndEmail(oauthServerAttribute.getSocialType(),
                oauthServerAttribute.getOAuth2MemberInfo().getEmail());

        Member member = null;

        //회원 가입
        if(!findMember.isPresent()){
            isSignUp = true;
            member = memberRepository.save(oauthServerAttribute.toEntity(
                    oauthServerAttribute.getSocialType(),
                    oauthServerAttribute.getOAuth2MemberInfo()));
        // 로그인
        }else{
            member = findMember.orElseThrow();
            generateToken(member, result);
        }

        if(isSignUp) httpStatus = HttpStatus.CREATED.value();
        result.put("status", httpStatus);
        // email, name, picture
        return result;
    }

    /**구글에서부터 토큰 받아오기 **/
    public String getIdTokenFromGoogle(String code, String redirectUri){
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String googleApi = "https://oauth2.googleapis.com/token";
        String targetUri = UriComponentsBuilder.fromHttpUrl(googleApi)
                .queryParam("code", code)
                .queryParam("client_id", googleclientId)
                .queryParam("client_secret", googleclientSecret)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("grant_type", "authorization_code").build().toUriString();

        ResponseEntity<String> response = restTemplate.exchange(targetUri, HttpMethod.POST, entity, String.class);

        Map<String, Object> map = getResponseToMap(response);

        return (String) map.get("id_token");
    }
    /**깃허브에서부터 토큰 받아오기 **/
    public String getTokenFromGithub(String code){
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String githubApi = "https://github.com/login/oauth/access_token";
        String targetUri = UriComponentsBuilder.fromHttpUrl(githubApi)
                .queryParam("client_id", githubclientId)
                .queryParam("client_secret", githubclientSecret)
                .queryParam("code", code).build().toUriString();

        return (String)getResponseToMap(restTemplate.exchange(targetUri, HttpMethod.POST, entity, String.class))
                .get("access_token");
    }

    /** 로그인 객체 생성 **/
    public LoginResponseDto getLoginInform(Member member){
        return new LoginResponseDto(member.getMemberId(),
                member.getUserName(),
                member.getUserImgUrl(),
                member.getSocialType(),
                portfolioHeartRepository.findByMember(member),
                projectHeartRepository.findByMember(member));
    }

    /** 토큰을 이용해 구글에서부터 사용자 정보 받아오기 **/
    private OauthServerAttribute getGoogleData(String id_token){
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity profileRequest = new HttpEntity(headers);
        String googleApi = "https://oauth2.googleapis.com/tokeninfo";
        String targetUri = UriComponentsBuilder.fromHttpUrl(googleApi)
                .queryParam("id_token", id_token).build().toUriString();
        ResponseEntity<String> profileResponse = restTemplate.exchange(
                targetUri,
                HttpMethod.GET,
                profileRequest,
                String.class
        );
        Map<String, Object> body = getResponseToMap(profileResponse);

        return OauthServerAttribute.of(SocialType.GOOGLE, body, authorityUtils);
    }

    /** 토큰을 이용해 깃허브에서부터 사용자 정보 받아오기 **/
    private OauthServerAttribute getGithubData(String accessToken){
        
        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity profileRequest = new HttpEntity(headers);
        String githubApi = "https://api.github.com/user";
        
        // 유저 정보 받아오기
        ResponseEntity<String> profileResponse = restTemplate.exchange(
                githubApi,
                HttpMethod.GET,
                profileRequest,
                String.class
        );

        Map<String, Object> body = getResponseToMap(profileResponse);

        // 유저 정보에 email 이 없을 경우 이메일 요청
        if((String) body.get("email") == null){
            String emailApi = "https://api.github.com/user/emails";
            ResponseEntity<String> emailResponse = restTemplate.exchange(
                    emailApi,
                    HttpMethod.GET,
                    profileRequest,
                    String.class
            );
            body.put("email", getResponseArrayToMap(emailResponse));
        }

        return OauthServerAttribute.of(SocialType.GITHUB, body, authorityUtils);
    }

    /** 소셜에서부터 받아온 Response 를 Map 으로 변환  **/
    private Map<String, Object> getResponseToMap(ResponseEntity<String> response){
        Gson gson = new Gson();
        Map<String, Object> map = null;
        if(response.getBody() != null){
            map = gson.fromJson(response.getBody(), Map.class);
        }
        return map;
    }

    private String getResponseArrayToMap(ResponseEntity<String> response){

        String email = null;
        try{
            Gson gson = new Gson();

            JsonArray jsonArray = gson.fromJson(response.getBody(), JsonArray.class);
            JsonObject firstElement = jsonArray.get(0).getAsJsonObject();
            email =  firstElement.get("email").getAsString();
        }catch (Exception e){
            e.printStackTrace();
        }
        return email;
    }

    /** 토큰 생성 및 저장 **/
    private void generateToken(Member member, Map<String, Object> result){
        // 토큰 생성 및 저장
        String accessToken = jwtTokenizer.delegateAccessToken(member);
        String refreshToken = jwtTokenizer.delegateRefreshToken(member);
        result.put("member", member);
        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);
        member.setRefreshToken(refreshToken);
        memberRepository.save(member);
    }
}
