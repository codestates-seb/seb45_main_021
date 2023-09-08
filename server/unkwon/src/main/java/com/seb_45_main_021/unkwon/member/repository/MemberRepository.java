package com.seb_45_main_021.unkwon.member.repository;

import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.entity.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    public Optional<Member> findByEmail(String email);
    public Optional<Member> findByMemberId(Long memberId);
    public Optional<Member> findBySocialTypeAndEmail(SocialType socialType, String email);
}
