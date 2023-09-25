package unkwon.project.dto.response;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProjectStatusResponseDto {
        private long projectId;
        private long memberId;
        private long commonCodeId;
        private String codeName;
}
