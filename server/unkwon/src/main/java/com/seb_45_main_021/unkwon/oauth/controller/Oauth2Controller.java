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
    @GetMapping("/google/signup")
    public ResponseEntity oauth2GoogleSignUp(@RequestParam("code") String code,
                                       HttpServletResponse response) {
        String redirectUri = "https://spec.today/signup";
        String id_token = oAuth2MemberService.getIdTokenFromGoogle(code, redirectUri);
        oAuth2MemberService.findOrSaveMember(id_token, "google");

        return new ResponseEntity(HttpStatus.CREATED);
    }
    @GetMapping("/google/signin")
    public ResponseEntity oauth2GoogleSignIn(@RequestParam("code") String code,
                                       HttpServletResponse response){
        String redirectUri = "https://spec.today/signin";
        String id_token = oAuth2MemberService.getIdTokenFromGoogle(code, redirectUri);

        Map<String, Object> result = oAuth2MemberService.findOrSaveMember(id_token, "google");

        if((Integer) result.get("status") == HttpStatus.CREATED.value()) return new ResponseEntity(HttpStatus.CREATED);

        // member 정보
        Member member = (Member) result.get("member");
        LoginResponseDto loginResponse = oAuth2MemberService.getLoginInform(member);
        response.setHeader("accessToken", (String) result.get("accessToken"));
        response.setHeader("refreshToken", (String) result.get("refreshToken"));

        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }

    @GetMapping("/github")
    public ResponseEntity oauth2GitHub(@RequestParam("code") String code,
                             HttpServletResponse response){
        log.info(code);
        String accessToken = oAuth2MemberService.getTokenFromGithub(code);
        Map<String, Object> result = oAuth2MemberService.findOrSaveMember(accessToken, "github");

        if((Integer) result.get("status") == HttpStatus.CREATED.value()) return new ResponseEntity(HttpStatus.CREATED);

        Member member = (Member) result.get("member");
        LoginResponseDto loginResponse = oAuth2MemberService.getLoginInform(member);
        response.setHeader("accessToken", (String) result.get("accessToken"));
        response.setHeader("refreshToken", (String) result.get("refreshToken"));

        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
}
