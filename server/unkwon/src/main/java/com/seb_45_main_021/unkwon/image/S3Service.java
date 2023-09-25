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
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


@Service
public class S3Service {

    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Autowired
    public S3Service(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    // 이미지를 S3에 업로드하고 URL 해싱하여 생성
    public String uploadFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String[] filNameSplit = fileName.split("\\.");
        String filNameStr = filNameSplit[0];
        String filExtension = filNameSplit[1];
        long millis = System.currentTimeMillis();
        try {
            String hash = makeSHA1Hash(filNameStr+millis);
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            String fileKey = hash+'.'+filExtension;
            s3Client.putObject(bucketName, fileKey, file.getInputStream(), objectMetadata);
            return fileKey;
        } catch (IOException e) {
            throw new RuntimeException("S3 업로드 중 에러 발생: " + fileName);
        } catch (NoSuchAlgorithmException e){
            throw new RuntimeException("S3 업로드 중 에러 발생: " + fileName);
        }

    }

    // S3에서 이미지 삭제
    public void deleteFile(String fileName) {
        String[] urlSplit = fileName.split("/");
        String key = urlSplit[urlSplit.length-1];
        s3Client.deleteObject(bucketName, key);
    }

    // bucketName 불러오는 메서드
    public String getBucketName() {
        return bucketName;
    }

    // URL 해싱하는 코드
    public String makeSHA1Hash(String input)
            throws NoSuchAlgorithmException, UnsupportedEncodingException
    {
        MessageDigest md = MessageDigest.getInstance("SHA1");
        md.reset();
        byte[] buffer = input.getBytes("UTF-8");
        md.update(buffer);
        byte[] digest = md.digest();

        String hexStr = "";
        for (int i = 0; i < digest.length; i++) {
            hexStr +=  Integer.toString( ( digest[i] & 0xff ) + 0x100, 16).substring( 1 );
        }
        return hexStr;
    }
}
