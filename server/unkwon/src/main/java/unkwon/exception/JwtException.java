package unkwon.exception;

import lombok.Getter;

public class JwtException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public JwtException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
