package com.seb_45_main_021.unkwon.member.controller;

import com.seb_45_main_021.unkwon.member.dto.request.MemberSignupDto;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    @PostMapping("/signup")
    public ResponseEntity signUp(@Valid @RequestBody MemberSignupDto memberSignupDto){
        memberService.signUp(memberSignupDto);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("/logout/{member-id}")
    public ResponseEntity logout(@PathVariable("member-id") @Positive Long memberId){
        memberService.logout(memberId);

        return new ResponseEntity(HttpStatus.OK);
    }
}
