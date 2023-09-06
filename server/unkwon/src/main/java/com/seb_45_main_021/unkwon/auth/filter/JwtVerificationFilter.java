package com.seb_45_main_021.unkwon.auth.filter;

import com.seb_45_main_021.unkwon.auth.jwt.JwtTokenizer;
import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.exception.JwtException;
import com.seb_45_main_021.unkwon.member.entity.Member;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

// request 당 한 번 실행되는 SecurityFilter
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                                    throws ServletException, IOException {
        try {
            log.info("JwtVerificationFilter");
            Map<String, Object> claims = verifyJwsAndDelegateNewToken(request, response);
            setAuthenticationToContext(claims);
            // 해당 예외들은 request 의 애트리뷰트로 추가
        } catch (JwtException e) {
            log.info("Message : " + e.getMessage());
            throw new JwtException(e.getExceptionCode());
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        if(request.getRequestURI().startsWith("/h2")) return true;
        if(request.getRequestURI().startsWith("/members/logout")) return true;
        String accessToken = request.getHeader("AccessToken");
        String refreshToken = request.getHeader("RefreshToken");

        // 로그아웃 상태에서의 요청
        if(accessToken == null && refreshToken == null){
            // 회원가입 신청은 로그아웃 상태에서 정상적인 요청으로 올 수 있는 유일한 POST 방식이다.
            // 그 이외의, 글 등록, 댓글 등록 등 요청들은 토큰이 있어야 가능
            if(request.getMethod().equals("POST") && (request.getRequestURI().startsWith("/members/signup"))) return true;
            // GET 이외에 DB 에 직접적인 영향을 주는 요청들은 토큰 없이 실행 불가능 하므로 예외 발생
            if(!request.getMethod().equals("GET")) throw new JwtException(ExceptionCode.BAD_ACCESS);
            // GET 요청은 토큰 없이도 가능하므로 필터 실행 x
            return true;
        }
        return accessToken == null || !accessToken.startsWith("Bearer");
    }


    private void setAuthenticationToContext(Map<String, Object> claims){
        String username = (String) claims.get("username");
        Long memberId = (Long) claims.get("memberId");

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        MemberInfo memberInfo = new MemberInfo(username, memberId);
        Authentication authentication = new UsernamePasswordAuthenticationToken(memberInfo, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /** DB 조회를 필터에서 하는 것은 옳지 않고, 서비스 레이어로 옮기고 싶지만 일단 구현 성공에 의의를 두려한다. **/
    private Map<String, Object> verifyJwsAndDelegateNewToken(HttpServletRequest request, HttpServletResponse response){
        // 헤더 값이기 때문에 토큰이 null 불가
        String accessToken = request.getHeader("AccessToken").replace("Bearer", "");
        String refreshToken = request.getHeader("RefreshToken");

        log.info("AccessToken : " + accessToken);
        log.info("RefreshToken : " + refreshToken);

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        // refreshToken 을 먼저 확인 후 만료 시 로그아웃 처리 -> subject(memberId) 획득
        Long hostId = verifyRefreshToken(refreshToken, base64EncodedSecretKey); // Patch, Delete 가 들어오는 객체 주인 식별자

        // 헤더로 들어온 refreshToken 과 id 가 같을 경우의 DB 에서 조회한 refreshToken 일치 여부 확인 (memberRepository 를 통해 member 객체를 조회)
        Member member = jwtTokenizer.findMemberByMemberId(hostId);
        // 일치하지 않을 경우
        // - 잘못된 접근으로 예외 발생
        if (!member.getRefreshToken().equals(refreshToken)) throw new JwtException(ExceptionCode.BAD_TOKEN);

        // 일치할 경우 accessToken 확인 ( refreshToken 유효 )
        Map<String, Object> claims = null;
        try{
<<<<<<< HEAD
            // 1. accessToken 유효 판단
            claims = jwtTokenizer.getClaims(accessToken, base64EncodedSecretKey).getBody();
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            // 2. accessToken 이 유효하지 않다면 refreshToken 을 통해 재발급 ( claims 는 위에서 조회한 member 객체를 이용해서 새로 생성 )
            String newAccessToken = jwtTokenizer.delegateAccessToken(member);
            response.setHeader("AccessToken", newAccessToken);
=======
            jwtTokenizer.verifySignature(refreshToken, base64EncodedSecretKey);
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            throw new JwtException(ExceptionCode.TIME_OUT);
        } catch (Exception e) {
            throw new JwtException(ExceptionCode.BAD_ACCESS);
        }
        // refreshToken 은 문제 없음.
        // accessToken 검증
        try{
            claims = jwtTokenizer.getClaims(accessToken, base64EncodedSecretKey).getBody();
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            // 시간 만료시 재발급 후 헤더 갱신
            regenerateToken(claims, response);
>>>>>>> serverDev
        } catch (Exception e) {
            throw new JwtException(ExceptionCode.BAD_ACCESS);
        }

        claims.put("memberId", hostId);
        return claims;
    }
<<<<<<< HEAD

    private Long verifyRefreshToken(String refreshToken, String base64EncodedSecretKey){
        Long hostId = null;
        try{
            hostId = Long.parseLong(jwtTokenizer.getSubject(refreshToken, base64EncodedSecretKey));
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            throw new JwtException(ExceptionCode.REFRESHTOKEN_HAS_EXPIRED);
        } catch (Exception e) {
            throw new JwtException(ExceptionCode.BAD_ACCESS);
        }
        return hostId;
=======
    private void regenerateToken(Map<String, Object> claims, HttpServletResponse response){
        String subject = (String) claims.get("username");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String newAccessToken = "Bearer" + jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        response.setHeader("AccessToken", newAccessToken);
>>>>>>> serverDev
    }

}
