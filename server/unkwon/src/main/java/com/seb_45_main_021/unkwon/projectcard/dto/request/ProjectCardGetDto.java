package com.seb_45_main_021.unkwon.projectcard.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProjectCardGetDto {
    private List<Long> members;
}
