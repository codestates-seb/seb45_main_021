package unkwon.project.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPostDto {
    private long memberId;

    private String title;

    private int totalPeople;

    private String closedAt;

    private String body;

    private String description;

    private String tags;

    private String lang;
}
