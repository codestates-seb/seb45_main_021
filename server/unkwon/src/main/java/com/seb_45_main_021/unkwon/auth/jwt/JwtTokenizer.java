package com.seb_45_main_021.unkwon.auth.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.exception.JwtException;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

// (1)
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenizer {
    @Getter
    @Value("${jwt.key.secret}")
    private String secretKey;       // (2)

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;        // (3)

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;          // (4)

    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }


    // subject = memberId (식별자)
    public String getSubject(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        String subject = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody().getSubject();

        return subject;
    }

    // subject 를 토큰 만료 등 예외처리 없이 얻기 위한 파싱
    public String getSubjectNoException(String refreshToken) throws JsonProcessingException {
        return (String) objectMapper
                .readValue(new String(Base64.getUrlDecoder()
                .decode(refreshToken.split("\\.")[1])), Map.class)
                .get("sub");
    }

    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // 전달된 key 로 jwt 의 서명 확인, 서명 변경 시 jwt 무효화 처리
                .build()
                .parseClaimsJws(jws); // JWT 의 내용 (claims, payload) 확인, 서명을 통해 변경 여부 확인 (ExpiredJwtException)
    }

    // (5)
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }



    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    // accessToken 생성
    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        // subject 를 이메일 대신 회원 식별자로 변경
        String subject = String.valueOf(member.getMemberId());
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());

        String base64EncodeSecretKey = encodeBase64SecretKey(getSecretKey());

        String accessToken = "Bearer" + generateAccessToken(claims, subject, expiration, base64EncodeSecretKey);

        return accessToken;
    }

    // accessToken 생성
    public String delegateRefreshToken(Member member) {
        // subject 를 이메일 대신 회원 식별자로 변경
        String subject = String.valueOf(member.getMemberId());
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());

        String base64EncodeSecretKey = encodeBase64SecretKey(getSecretKey());

        String accessToken = generateRefreshToken(subject, expiration, base64EncodeSecretKey);

        return accessToken;
    }

    public Member findMemberByMemberId(Long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new JwtException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void setRefreshTokenHasNull(Member member){
        memberRepository.save(member);
    }

}