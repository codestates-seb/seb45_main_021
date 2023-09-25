package unkwon.project.dto.response;

import com.seb_45_main_021.unkwon.image.project.ProjectImage;
import com.seb_45_main_021.unkwon.image.project.ProjectTitleImage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class ProjectResponseDto {
    private long projectId;
    private int view;
    private long memberId;
    private  String userName;
    private String userImgUrl;
    private String title;
    private int totalPeople;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String closedAt;
    private String body;
    private List<Long> joinPeople;
    private List<Long> requestPeople;
    private List<ProjectImage> images;
    private ProjectTitleImage projectTitleImage;
    private String description;
    private String[] tags;
    private String lang;
    private int heartCount;
}
