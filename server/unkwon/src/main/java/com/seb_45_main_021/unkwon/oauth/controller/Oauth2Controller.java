package com.seb_45_main_021.unkwon.oauth.controller;

import com.seb_45_main_021.unkwon.member.dto.response.LoginResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.oauth.service.OAuth2MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class Oauth2Controller {
    private final OAuth2MemberService oAuth2MemberService;
    private String redirectUriBySignUp = "https://spec.today/signup";
    private String redirectUriBySignIn = "https://spec.today/signin";

    @GetMapping("/google/signup")
    public ResponseEntity oauth2GoogleSignUp(@RequestParam("code") String code,
                                       HttpServletResponse response) {
        String id_token = oAuth2MemberService.getIdTokenFromGoogle(code, redirectUriBySignUp);
        oAuth2MemberService.findOrSaveMember(id_token, "google", redirectUriBySignUp);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/google/signin")
    public ResponseEntity oauth2GoogleSignIn(@RequestParam("code") String code,
                                       HttpServletResponse response){
        String id_token = oAuth2MemberService.getIdTokenFromGoogle(code, redirectUriBySignIn);

        Map<String, Object> result = oAuth2MemberService.findOrSaveMember(id_token, "google", redirectUriBySignIn);

        if((Integer) result.get("status") == HttpStatus.CREATED.value()) return new ResponseEntity(HttpStatus.CREATED);

        // member 정보
        Member member = (Member) result.get("member");
        LoginResponseDto loginResponse = oAuth2MemberService.getLoginInform(member);
        response.setHeader("accessToken", (String) result.get("accessToken"));
        response.setHeader("refreshToken", (String) result.get("refreshToken"));

        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }

    @GetMapping("/github/signup")
    public ResponseEntity oauth2GitHubSingUp(@RequestParam("code") String code,
                                             HttpServletResponse response){
        String accessToken = oAuth2MemberService.getTokenFromGithub(code);
        oAuth2MemberService.findOrSaveMember(accessToken, "github", redirectUriBySignUp);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/github/signin")
    public ResponseEntity oauth2GitHubSignIn(@RequestParam("code") String code,
                                             HttpServletResponse response){
        String accessToken = oAuth2MemberService.getTokenFromGithub(code);
        Map<String, Object> result = oAuth2MemberService.findOrSaveMember(accessToken, "github", redirectUriBySignIn);

        if((Integer) result.get("status") == HttpStatus.CREATED.value()) return new ResponseEntity(HttpStatus.CREATED);

        Member member = (Member) result.get("member");
        LoginResponseDto loginResponse = oAuth2MemberService.getLoginInform(member);
        response.setHeader("accessToken", (String) result.get("accessToken"));
        response.setHeader("refreshToken", (String) result.get("refreshToken"));

        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
}
