package unkwon.auth.handler;

import com.google.gson.Gson;
import com.seb_45_main_021.unkwon.auth.jwt.JwtTokenizer;
import com.seb_45_main_021.unkwon.dto.MemberHeartDto;
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
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final PortfolioHeartRepository portfolioHeartRepository;
    private final ProjectHeartRepository projectHeartRepository;

    private static final SocialType socialType = SocialType.SPEC;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
                                        HttpServletResponse response, 
                                        Authentication authentication) throws IOException{
        
        // 인증 성공 후 로그 기록 또는 사용자 정보를 response 로 전송하는 등의 추가 작업 가능
        log.info("# Authenticated successfully");
        String email = ((Member) authentication.getPrincipal()).getEmail();
        // DB 에 저장된 완전한 Member 객체
        Member member = findMemberByEmailAndSocialType(email);

        // 회원가입일 경우 아래 로직은 실행 되어서는 안된다.
        setMemberToResponse(response, member);
        // setMemberHeartsList(response, member);
        setTokenToResponse(response, member);
    }

    // 로그인 시 반환에 필요한 회원 정보 
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

    // 토큰 생성 및 DB 저장
    private void setTokenToResponse(HttpServletResponse response, Member member){
        String accessToken = jwtTokenizer.delegateAccessToken(member);
        String refreshToken = jwtTokenizer.delegateRefreshToken(member);

        response.setHeader("accessToken", accessToken);
        response.setHeader("refreshToken", refreshToken);

        member.updateRefreshToken(refreshToken);

        memberRepository.save(member);
    }
    
    // 회원이 좋아요한 포트폴리오, 프로젝트 식별자 리스트
    private void setMemberHeartsList(HttpServletResponse response, Member member) throws IOException{
        MemberHeartDto heartDto = new MemberHeartDto(portfolioHeartRepository.findByMember(member),
                                                     projectHeartRepository.findByMember(member));

        Gson gson = new Gson();
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(heartDto, MemberHeartDto.class));
    }

    private Member findMemberByEmailAndSocialType(String email){
        return memberRepository.findBySocialTypeAndEmail(socialType, email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
