package com.seb_45_main_021.unkwon.heart.service;

import com.seb_45_main_021.unkwon.auth.jwt.JwtTokenizer;
import com.seb_45_main_021.unkwon.heart.dto.HeartDto;
import com.seb_45_main_021.unkwon.heart.repository.HeartRepository;
import com.seb_45_main_021.unkwon.member.repository.MemberRepository;
import com.seb_45_main_021.unkwon.portfolio.repository.PortFolioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class HeartService {
    private final HeartRepository heartRepository;
    private final MemberRepository memberRepository;
    private final PortFolioRepository portFolioRepository;
    private final JwtTokenizer jwtTokenizer;

    public HeartService(HeartRepository heartRepository, MemberRepository memberRepository, PortFolioRepository portFolioRepository, JwtTokenizer jwtTokenizer) {
        this.heartRepository = heartRepository;
        this.memberRepository = memberRepository;
        this.portFolioRepository = portFolioRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

//    public void heart(HeartDto heartDto, String jwtToken) throws IOException {
//
//
//        if()
//    }
}


