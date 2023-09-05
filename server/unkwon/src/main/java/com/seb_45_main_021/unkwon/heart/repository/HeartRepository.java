package com.seb_45_main_021.unkwon.heart.repository;

import com.seb_45_main_021.unkwon.heart.entity.Heart;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.sound.sampled.Port;
import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart,Long> {

    Heart findByPortFolioAndMember(PortFolio portFolio, Member member);

    Page<Heart> findByMember(Member member, Pageable pageable);

    boolean existsByPortFolioAndMember(PortFolio portFolio, Member member);


}
