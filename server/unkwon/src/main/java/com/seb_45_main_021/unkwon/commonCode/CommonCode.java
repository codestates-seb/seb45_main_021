package com.seb_45_main_021.unkwon.commonCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CommonCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeId; // 코드 식별자
    private String category; // 코드의 카테고리
    private String codeValue; // 코드의 실제 값
    private String codeName; // 코드의 읽기 좋은 이름
}
