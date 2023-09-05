package com.seb_45_main_021.unkwon.member.service;

import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.dto.request.MemberSignupDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // 생성자 주입을 임의의 코드 없이 가능하게 한다.
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private static final String IMG_URL = ""; // 회원 가입시 기본 이미지 URL
    public void signUp(MemberSignupDto memberSignupDto){
        // 이메일 중복 확인
        verifiedExistsEmail(memberSignupDto.getEmail());

        List<String> roles = authorityUtils.createRoles(memberSignupDto.getEmail());

        Member member = new Member(
                memberSignupDto.getEmail(),
                passwordEncoder.encode(memberSignupDto.getPassword()),
                memberSignupDto.getUsername(),
                roles,
                IMG_URL
        );

        memberRepository.save(member);
    }

    public void logout(Long memberId){
        // 로그아웃 시 없는 회원일 경우
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 로그인 하지 않은 상태의 회원을 로그아웃 시키는 요청이 들어올 경우 잘못된 접근으로 판단
        if(findMember.refreshTokenIsNull()) throw new BusinessLogicException(ExceptionCode.BAD_ACCESS);
        findMember.setRefreshToken(null);

        memberRepository.save(findMember);
    }



    public void verifiedExistsEmail(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);

        if(findMember.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    public Member getMemberById(Long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }



}
