package unkwon.auth.handler;

import com.seb_45_main_021.unkwon.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 접근 권한이 없는 자원에 접근하려 했을 경우 AccessDeniedException 발생 
// 해당 예외를 잡는 핸들러
@Slf4j
@Component
public class UserAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN, accessDeniedException.getMessage());
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
