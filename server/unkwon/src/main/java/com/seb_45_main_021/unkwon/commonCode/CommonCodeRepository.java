package com.seb_45_main_021.unkwon.commonCode;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommonCodeRepository extends JpaRepository<CommonCode, Long> {
    List<CommonCode> findByCategory(String category);
    CommonCode findByCodeValue(String codeValue);
}
