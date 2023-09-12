package com.seb_45_main_021.unkwon.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    // 프로젝트 이미지 업로드
    @PostMapping("/project/{projectId}")
    public ResponseEntity<String> uploadProjectImage(@RequestParam("image") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadProjectImage(file));
    }

    // 프로젝트 이미지 삭제
    @DeleteMapping("/project/{fileName}")
    public ResponseEntity<Void> deleteProjectImage(@PathVariable String fileName) {
        imageService.deleteProjectImage(fileName);
        return ResponseEntity.noContent().build();
    }

    // 프로젝트 타이틀 이미지 등록
    @PostMapping("/project-title")
    public ResponseEntity<String> uploadProjectTitleImage(@RequestParam("titleImageFile") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadProjectTitleImage(file));
    }

    // 프로젝트 타이틀 이미지 삭제
    @DeleteMapping("/project-title/{fileName}")
    public ResponseEntity<Void> deleteProjectTitleImage(@PathVariable String fileName) {
        imageService.deleteProjectTitleImage(fileName);
        return ResponseEntity.noContent().build();
    }
}
