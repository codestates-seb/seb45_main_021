package com.seb_45_main_021.unkwon.exception;

import lombok.Getter;

public enum ExceptionCode {
    NOT_FOUND(404, "Not Found"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    COOKIE_NOT_FOUND(401, "Cookie Not Found"),
    MEMBER_EXISTS(409, "Member exists"),
    DIFFERENT_PASSWORD(401, "Different Password"),
    DIFFERENT_MEMBER(401, "Different Member"),
    BAD_ACCESS(401, "Bad Access"),
    REFRESHTOKEN_HAS_EXPIRED(401, "refreshToken has expired"),
    STATUS_LOGIN(401, "Status Login"),
    CARD_LIMIT_OVER(422, "Card Limit Over"),
    BAD_TOKEN(401, "Bad Token");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
