package com.suyang.incense.common.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.suyang.incense.api.response.member.EntryPointErrorRes;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * 인증 실패시 결과를 처리해주는 로직을 가지고 있는 클래스
 */

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException ex) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        // [commence] 인증 실패로 response.sendError 발생

        EntryPointErrorRes entryPointErrorRes = new EntryPointErrorRes();
        entryPointErrorRes.setMsg("인증이 실패하였습니다.");

        response.setStatus(401);
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(entryPointErrorRes));
        //response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
