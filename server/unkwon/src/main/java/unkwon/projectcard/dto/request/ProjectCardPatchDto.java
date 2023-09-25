package unkwon.projectcard.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ProjectCardPatchDto {
    @Setter
    private Long projectCardId;
    private String tell;
    private String aboutMe;
    // 태그
    private String[] tags;
}
