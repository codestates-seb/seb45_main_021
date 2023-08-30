package com.seb_45_main_021.unkwon.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_45_main_021.unkwon.exception.ErrorResponse;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);
        } catch (JwtException e){
            System.out.println("Handler : " + e.getMessage());
            setErrorResponse(response, HttpStatus.UNAUTHORIZED, e);
        }
    }

    private void setErrorResponse(HttpServletResponse response, HttpStatus status, Throwable e) throws IOException{
        response.setStatus(status.value());
        response.setContentType("application/json");
        try{
            String json = new ObjectMapper().writeValueAsString(ErrorResponse.of(HttpStatus.UNAUTHORIZED, e.getMessage()));
            response.getWriter().write(json);
        }catch (Exception ee){
            System.out.println(ee.getMessage());
        }
    }
}
