package com.seb_45_main_021.unkwon.exception;

import lombok.Getter;

public enum ExceptionCode {
    NOT_FOUND(404, "Not Found"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    PORTFOLIO_NOT_FOUND(404,"Portfolio not found"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    MEMBER_EXISTS(409, "Member exists"),
    DIFFERENT_PASSWORD(401, "Different Password"),
    DIFFERENT_MEMBER(401, "Different Member"),
    BAD_ACCESS(401, "Bad Access"),
    REFRESHTOKEN_HAS_EXPIRED(401, "refreshToken has expired"),
    STATUS_LOGIN(401, "Status Login"),
    BAD_TOKEN(401, "Bad Token"),
    PROJECT_NOT_FOUND(404, "Project not found"),
    PROJECT_STATUS_NOT_FOUND(404, "Project Status not found"),
    COMMON_CODE_NOT_FOUND(404, "Common Code not found"),
    CARD_LIMIT_OVER(422, "Card Limit Over"),
    ALREADY_APPLIED(401, "Already applied");




    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
