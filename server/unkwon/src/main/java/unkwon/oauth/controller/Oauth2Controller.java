package unkwon.oauth.controller;

import com.seb_45_main_021.unkwon.member.dto.response.LoginResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.oauth.service.OAuth2MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    @GetMapping("/google")
    public ResponseEntity oauth2Google(@RequestParam("code") String code,
                                       HttpServletResponse response){
        String id_token = oAuth2MemberService.getIdTokenFromGoogle(code, redirectUriBySignIn);

        Map<String, Object> result = oAuth2MemberService.findOrSaveMember(id_token, "google", redirectUriBySignIn);

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
        String accessToken = oAuth2MemberService.getTokenFromGithub(code);
        Map<String, Object> result = oAuth2MemberService.findOrSaveMember(accessToken, "github", null);

        Member member = (Member) result.get("member");
        LoginResponseDto loginResponse = oAuth2MemberService.getLoginInform(member);
        response.setHeader("accessToken", (String) result.get("accessToken"));
        response.setHeader("refreshToken", (String) result.get("refreshToken"));

        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
}
