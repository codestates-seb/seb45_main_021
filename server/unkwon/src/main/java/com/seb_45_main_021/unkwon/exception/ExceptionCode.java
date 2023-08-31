package com.seb_45_main_021.unkwon.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    DIFFERENT_PASSWORD(401, "Different Password"),
    COOKIE_NOT_FOUND(401, "Cookie Not Found"),
    BAD_ACCESS(401, "Bad Access"),
    TIME_OUT(401, "Time Out"),
    STATUS_LOGIN(401, "Status Login"),
    BAD_TOKEN(401, "Bad Token"),
    PORTFOLIO_NOT_FOUND(404,"Portfolio not found"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    PROJECT_NOT_FOUND(404, "Question not found");



    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
