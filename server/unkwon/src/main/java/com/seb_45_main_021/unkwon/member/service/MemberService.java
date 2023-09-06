package com.seb_45_main_021.unkwon.member.service;

import com.querydsl.jpa.JPQLQuery;
import com.seb_45_main_021.unkwon.auth.utils.CustomAuthorityUtils;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.dto.request.MemberInformUpdateDto;
import com.seb_45_main_021.unkwon.member.dto.request.MemberPasswordUpdateDto;
import com.seb_45_main_021.unkwon.member.dto.request.MemberSignupDto;
import com.seb_45_main_021.unkwon.member.dto.response.MemberInformResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // 생성자 주입을 임의의 코드 없이 가능하게 한다.
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private static final String IMG_URL = ""; // 회원 가입시 기본 이미지 URL

    /** 회원 가입 **/
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

    /** 회원 정보 조회(공통) **/
    public Member getMemberInform(Long memberId){
        Member findMember = findVerifiedMember(memberId);

        return findMember;
        // 회원 개인 정보
        // 포트폴리오 (내가 작성한 포트폴리오를 가져와서 변수로 재직용/구직용 구분)
        // 프로젝트 (내가 작성한 프로젝트, 회원과 프로젝트 다대다 매핑으로 내가 신청한 프로젝트 리스트 가져오기)
    }

    /** 회원 정보 조회(개인) **/
    public void getMemberPrivateInform(Long memberId){
        findVerifiedMember(memberId);

        // 조회 회원이 자기 자신일 경우
        // 찜 리스트 (내가 좋아요한 프로젝트, 포트폴리오 리스트 가져오기) 다대다 매핑
        // 프로젝트 카드 (그냥 가져오면 됨)

    }

    /** 회원 정보 수정(개인 정보) **/
    public void updateMemberInform(MemberInformUpdateDto dto){
        Member findMember = findVerifiedMember(dto.getMemberId());

        // 나이
        Optional.ofNullable(dto.getAge())
                .ifPresent(age -> findMember.setAge(age));
        // 자기소개
        Optional.ofNullable(dto.getAboutMe())
                .ifPresent(aboutMe -> findMember.setAboutMe(aboutMe));

        // 유저네임
        Optional.ofNullable(dto.getUsername())
                .ifPresent(username -> findMember.setUsername(username));

        // 재직 상태
        Optional.ofNullable(dto.isWorking())
                .ifPresent(isWorking -> findMember.setWorking(isWorking));

        // 태그
        Optional.ofNullable(dto.getTags())
                .ifPresent(tags -> findMember.setTag(tags));

        memberRepository.save(findMember);
    }

    /** 회원 정보 수정(비밀 번호) **/
    public void updatePassword(MemberPasswordUpdateDto dto){
        Member findMember = findVerifiedMember(dto.getMemberId());

        comparePassword(dto.getPrevPassword(), findMember.getPassword());

        findMember.updatePassword(passwordEncoder.encode(dto.getNewPassword()));

        memberRepository.save(findMember);
    }

    /** 회원 탈퇴(삭제) **/
    /** 회원 상태로 구분해 탈퇴 처리를 할지 생각 **/
    public void removeMember(Long memberId){
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    /** 로그 아웃 **/
    public void logout(Long memberId){
        // 로그아웃 시 없는 회원일 경우
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 로그인 하지 않은 상태의 회원을 로그아웃 시키는 요청이 들어올 경우 잘못된 접근으로 판단
        if(findMember.refreshTokenIsNull()) throw new BusinessLogicException(ExceptionCode.BAD_ACCESS);
        findMember.updateRefreshToken(null);

        memberRepository.save(findMember);
    }

    /** 회원 DB 조회 (이메일) **/
    private void verifiedExistsEmail(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);

        if(findMember.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    /** 회원 DB 조회 (식별자) **/
    public Member findVerifiedMember(Long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    /** 비밀번호 비교 **/
    private void comparePassword(String prevPassword, String userPassword){
        if(!passwordEncoder.matches(prevPassword, userPassword))
            throw new BusinessLogicException(ExceptionCode.DIFFERENT_PASSWORD);
    }
}
