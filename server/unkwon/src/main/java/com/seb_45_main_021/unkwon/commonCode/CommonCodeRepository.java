package com.seb_45_main_021.unkwon.commonCode;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommonCodeRepository extends JpaRepository<CommonCode, Long> {
    List<CommonCode> findByCategory(String category);
    Optional<CommonCode> findByCodeValue(String codeValue);
    Optional<CommonCode> findByCodeId(Long codeId);
}
