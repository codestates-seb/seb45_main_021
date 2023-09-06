package com.seb_45_main_021.unkwon.member.controller;

import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.dto.MultiInformResponseDto;
import com.seb_45_main_021.unkwon.heart.entity.Heart;
import com.seb_45_main_021.unkwon.member.dto.request.MemberInformUpdateDto;
import com.seb_45_main_021.unkwon.member.dto.request.MemberPasswordUpdateDto;
import com.seb_45_main_021.unkwon.member.dto.request.MemberSignupDto;
import com.seb_45_main_021.unkwon.member.dto.response.MemberInformResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.mapper.MemberMapper;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.projectcard.mapper.ProjectCardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ProjectCardMapper projectCardMapper;

    /** 회원 가입 **/
    @PostMapping("/signup")
    public ResponseEntity signUp(@Valid @RequestBody MemberSignupDto memberSignupDto){
        memberService.signUp(memberSignupDto);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    /** 로그 아웃 **/
    @PostMapping("/logout/{member-id}")
    public ResponseEntity logout(@PathVariable("member-id") @Positive Long memberId){
        memberService.logout(memberId);

        return new ResponseEntity(HttpStatus.OK);
    }

    /** 회원 정보 조회 **/
    // 정렬 기준 : 최신순
    @GetMapping("/{member-id}/{host-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId,
                                    @PathVariable("host-id") @Positive Long hostId,
                                    UsernamePasswordAuthenticationToken authentication){
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();
        log.info(memberInfo.getEmail());
        log.info("memberId: " + memberInfo.getMemberId());
        Member findMember = memberService.getMemberInform(memberId);

        MemberInformResponseDto responseDto = memberMapper.memberToMemberInformResponseDto(findMember);
        MultiInformResponseDto responseInformDto = new MultiInformResponseDto(responseDto);
        // 회원 개인 정보
        // 포트폴리오, 프로젝트
        responseInformDto.setProjectList(new ArrayList<Project>(), new ArrayList<Project>());
        responseInformDto.setPortFoliolist(new ArrayList<PortFolio>(), new ArrayList<PortFolio>());

//        findMember.getPortFolioList().stream()
//                .filter(portFolio -> portFolio.isWorking())
//                .collect(Collectors.toList());

        // 1. 로그인 상태
        // 2. 자기 자신의 프로필 조회
        if(hostId != 0 && memberId == hostId){
            // 찜 리스트, 프로젝트 카드
            responseInformDto.setHeartList(new ArrayList<Heart>(), new ArrayList<Heart>());
            responseInformDto.setProjectCardList(projectCardMapper.
                    projectCardListToProjectCardResponseDto(findMember.getProjectCardList()));
        }

        return new ResponseEntity<>(responseInformDto, HttpStatus.OK);
    }

    /** 회원 정보 수정 (프로필 사진) **/
    @PatchMapping("/profileImg/{member-id}")
    public void updateProfile(@PathVariable("member-id") @Positive Long memberId){}

    /** 회원 정보 수정 (개인 정보) **/
    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive Long memberId,
                             @Valid @RequestBody MemberInformUpdateDto dto) {
        dto.setMemberId(memberId);
        memberService.updateMemberInform(dto);

        return new ResponseEntity(HttpStatus.OK);
    }

    /** 회원 정보 수정 (비밀번호) **/
    @PatchMapping("/password/{member-id}")
    public ResponseEntity updatePassword(@PathVariable("member-id") @Positive Long memberId,
                               @Valid @RequestBody MemberPasswordUpdateDto dto){
        dto.setMemberId(memberId);
        memberService.updatePassword(dto);

        return new ResponseEntity(HttpStatus.OK);
    }

    /** 회원 탈퇴 **/
    @DeleteMapping("/{member-id}")
    public void deleteMember(@PathVariable("member-id") @Positive Long memberId){
        memberService.removeMember(memberId);
    }
}
