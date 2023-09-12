package com.seb_45_main_021.unkwon.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private ProjectImageRepository projectImageRepository;

    @Autowired
    private ProjectTitleImageRepository projectTitleImageRepository;

    public String uploadProjectImage(MultipartFile file) {
        String fileName = s3Service.uploadFile(file);
        ProjectImage projectImage = new ProjectImage();
        projectImage.setImageUrl(fileName);
        projectImageRepository.save(projectImage);
        return fileName;
    }

    public void deleteProjectImage(String fileName) {
        s3Service.deleteFile(fileName);
        projectImageRepository.deleteByImageUrl(fileName);
    }

    public String uploadProjectTitleImage(MultipartFile file) {
        String fileName = s3Service.uploadFile(file);
        ProjectTitleImage projectTitleImage = new ProjectTitleImage();
        projectTitleImage.setImageUrl(fileName);
        projectTitleImageRepository.save(projectTitleImage);
        return fileName;
    }

    public void deleteProjectTitleImage(String fileName) {
        s3Service.deleteFile(fileName);
        projectTitleImageRepository.deleteByImageUrl(fileName);
    }
}
