package com.seb_45_main_021.unkwon.dto;

import lombok.Getter;

import java.util.List;


@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, PageInfo pageInfo) {
        this.data = data;
        this.pageInfo = pageInfo;
    }
}