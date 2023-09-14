package com.seb_45_main_021.unkwon.member.controller;

import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.dto.MultiInformResponseDto;
import com.seb_45_main_021.unkwon.heart.entity.PortfolioHeart;
import com.seb_45_main_021.unkwon.heart.entity.ProjectHeart;
import com.seb_45_main_021.unkwon.member.dto.request.MemberInformUpdateDto;
import com.seb_45_main_021.unkwon.member.dto.request.MemberPasswordUpdateDto;
import com.seb_45_main_021.unkwon.member.dto.request.MemberSignupDto;
import com.seb_45_main_021.unkwon.member.dto.response.MemberInformResponseDto;
import com.seb_45_main_021.unkwon.member.dto.response.UserImgUrlResponseDto;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.mapper.MemberMapper;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import com.seb_45_main_021.unkwon.portfolio.entity.Portfolio;
import com.seb_45_main_021.unkwon.portfolio.mapper.PortfolioMapper;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.mapper.ProjectMapper;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import com.seb_45_main_021.unkwon.projectcard.mapper.ProjectCardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ProjectCardMapper projectCardMapper;
    private final PortfolioMapper portfolioMapper;
    private final ProjectMapper projectMapper;

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
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId,
                                    UsernamePasswordAuthenticationToken authenticationToken){

        // authentication 회원이 null 이면 비로그인, null 아니라면 hostId
        Member findMember = memberService.getMemberInform(memberId);

        // 회원 개인 정보
        MemberInformResponseDto responseDto = memberMapper.memberToMemberInformResponseDto(findMember);
        MultiInformResponseDto responseInformDto = new MultiInformResponseDto(responseDto);

        // 프로젝트
        responseInformDto.setProjectList(
                projectMapper.projectToProfileResponseDto(findMember.getProjects()),
                projectMapper.supportedProjectsToProfileResponseDto(memberService.getSupportedProjects(findMember))
        );

        // 포트폴리오
        responseInformDto.setPortfoliolist(
                  portfolioMapper.portFolioListToProfileResponseDto(Portfolio.getPortfolioIsEmployList(findMember.getPortfolios()))
                , portfolioMapper.portFolioListToProfileResponseDto(Portfolio.getPortfolioIsNotEmployList(findMember.getPortfolios()))
        );

        // 1. 로그인 상태
        // 2. 자기 자신의 프로필 조회
        if(authenticationToken != null){
            MemberInfo memberInfo = (MemberInfo) authenticationToken.getPrincipal();
            if(memberInfo.getMemberId() == memberId){
                // 찜 리스트(프로젝트, 포트폴리오)
                List<PortfolioHeart> portfolioHeartList = memberService.getPortfolioInHeart(findMember);
                List<ProjectHeart> projectHeartList = memberService.getProjectInHeart(findMember);

                responseInformDto.setPortfolioHeartList(portfolioMapper.portFolioHeartListToProfileResponseDto(portfolioHeartList));
                responseInformDto.setProjectHeartList(projectMapper.projectHeartListToProfileResponseDto(projectHeartList));

                // 프로젝트 카드
                responseInformDto.setProjectCardList(projectCardMapper.projectCardListToProjectCardResponseDto(ProjectCard.changeLocation(findMember.getProjectCardList())));
            }
        }

        return new ResponseEntity<>(responseInformDto, HttpStatus.OK);
    }

    /** 회원 정보 수정 (프로필 사진) **/
    @PatchMapping("/profileImg/{member-id}")
    public ResponseEntity updateProfile(@PathVariable("member-id") @Positive Long memberId,
                              UsernamePasswordAuthenticationToken authentication,
                              @RequestParam(value = "uploadImg", required = false) MultipartFile uploadImgFile){
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();
        String userImgUrl = memberService.updateProfileImg(memberId, memberInfo, uploadImgFile);
        UserImgUrlResponseDto dto = UserImgUrlResponseDto
                                    .builder()
                                    .userImgUrl(userImgUrl).build();

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    /** 회원 정보 수정 (개인 정보) **/
    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive Long memberId,
                                        @Valid @RequestBody MemberInformUpdateDto dto,
                                       UsernamePasswordAuthenticationToken authentication) {
        dto.setMemberId(memberId);
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();
        memberService.updateMemberInform(dto, memberInfo);

        return new ResponseEntity(HttpStatus.OK);
    }

    /** 회원 정보 수정 (비밀번호) **/
    @PatchMapping("/password/{member-id}")
    public ResponseEntity updatePassword(@PathVariable("member-id") @Positive Long memberId,
                                         @Valid @RequestBody MemberPasswordUpdateDto dto,
                                         UsernamePasswordAuthenticationToken authentication){
        dto.setMemberId(memberId);
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();
        memberService.updatePassword(dto, memberInfo);

        return new ResponseEntity(HttpStatus.OK);
    }

    /** 회원 탈퇴 **/
    @DeleteMapping("/{member-id}")
    public void deleteMember(@PathVariable("member-id") @Positive Long memberId,
                             UsernamePasswordAuthenticationToken authentication){
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();
        memberService.removeMember(memberId, memberInfo);
    }
}
