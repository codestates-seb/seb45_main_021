package unkwon.project.dto.response;

import com.seb_45_main_021.unkwon.dto.Author;
import com.seb_45_main_021.unkwon.member.entity.Member;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class ProjectProfileResponseDto {
    private Long projectId;
    private String title;
    private String createdAt;
    private int heartCount;
    private Author author;
    private String codeValue;

    public ProjectProfileResponseDto(Long projectId, String title, LocalDateTime createdAt, int heartCount) {
        this.projectId = projectId;
        this.title = title;
        setCreatedAt(createdAt);
        this.heartCount = heartCount;
    }

    public ProjectProfileResponseDto(Long projectId, String title, LocalDateTime createdAt, int heartCount, Member member, String codeValue) {
        this.projectId = projectId;
        this.title = title;
        setCreatedAt(createdAt);
        this.heartCount = heartCount;
        author = Author.builder()
                .userName(member.getUserName())
                .memberId(member.getMemberId())
                .build();
        this.codeValue = codeValue;
    }

    public ProjectProfileResponseDto(Long projectId, String title, LocalDateTime createdAt, int heartCount, Member member) {
        this.projectId = projectId;
        this.title = title;
        setCreatedAt(createdAt);
        this.heartCount = heartCount;
        author = Author.builder()
                .userName(member.getUserName())
                .memberId(member.getMemberId())
                .build();
    }

    public void setCreatedAt(LocalDateTime createdAt){
        // YYYY-DD-MM 포맷 형식
        this.createdAt = createdAt.format(DateTimeFormatter.ISO_DATE);
    }
}
