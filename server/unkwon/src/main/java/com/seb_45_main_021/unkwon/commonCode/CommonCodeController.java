package com.seb_45_main_021.unkwon.commonCode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/common-codes")
public class CommonCodeController {

    private final CommonCodeService commonCodeService;

    @Autowired
    public CommonCodeController(CommonCodeService commonCodeService) {
        this.commonCodeService = commonCodeService;
    }

    // MemberStatus 카테고리에 속한 모든 상태코드 조회 가능
    @GetMapping
    public ResponseEntity<List<CommonCode>> getCommonCodeByCategory(@RequestParam String category) {
        List<CommonCode> codes = commonCodeService.findCodesByCategory(category);
        return new ResponseEntity<>(codes, HttpStatus.OK);
    }
}
