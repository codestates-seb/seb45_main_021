package unkwon.exception;

import lombok.Getter;

// 401 : 익명 상태의 접근
// 403 : 자원 접근 권한 없을 경우
public enum ExceptionCode {
    DIFFERENT_PASSWORD(401, "Different Password"), // 비밀번호 틀림
    BAD_ACCESS(401, "Bad Access"), // 잘못된 토큰으로 접근할 경우
    REFRESHTOKEN_HAS_EXPIRED(401, "refreshToken has expired"), // 리프레시 토큰 만료( 로그인 만료 )
    STATUS_LOGIN(401, "Status Login"), // 현재 로그인 상태
    NOT_LOGIN(401, "Not Login"),
    BAD_TOKEN(401, "Bad Token"), // 잘못된 토큰 전달
    DIFFERENT_MEMBER(403, "Different Member"), // 자원 접근 권한이 없는 경우 ( 다른 회원의 자원에 접근하려 하는 경우 )
    ALREADY_APPLIED(401, "Already applied"),
    NOT_FOUND(404, "Not Found"), // 찾지 못했을 경우
    MEMBER_NOT_FOUND(404, "Member not found"), // 회원을 찾지 못했을 경우
    PORTFOLIO_NOT_FOUND(404,"Portfolio not found"), // 포트폴리오를 찾지 못했을 경우
    COMMENT_NOT_FOUND(404,"Comment not found"), // 댓글을 찾지 못했을 경우
    PROJECT_NOT_FOUND(404, "Project not found"), // 프로젝트를 찾지 못했을 경우
    PROJECT_STATUS_NOT_FOUND(404, "Project Status not found"), 
    COMMON_CODE_NOT_FOUND(404, "Common Code not found"),
    MEMBER_EXISTS(409, "Member exists"), // 멤버 존재
    CARD_LIMIT_OVER(422, "Card Limit Over"); // 프로젝트 카드의 개수가 상한선을 넘었을 경우




    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
