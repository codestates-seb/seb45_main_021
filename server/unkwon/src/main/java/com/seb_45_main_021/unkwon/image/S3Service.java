package com.seb_45_main_021.unkwon.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class S3Service {

    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Autowired
    public S3Service(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    // 이미지를 S3에 업로드하고 URL 가져오기
    public String uploadFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            s3Client.putObject(bucketName, fileName, file.getInputStream(), objectMetadata);
        } catch (IOException e) {
            throw new RuntimeException("S3 업로드 중 에러 발생: " + fileName);
        }
        return fileName; // 파일명 리턴 (S3 URL 반환도 가능)
    }

    // S3에서 이미지 삭제
    public void deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
    }

    public String getBucketName() {
        return bucketName;
    }
}
