package com.suyang.incense.config.auth;

import com.suyang.incense.common.auth.MemberDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final MemberDetailsService memberDetailsService; // Spring Security 에서 제공하는 서비스 레이어
    private String secretKey = "dyAeHubOOc8KaOfYB6XEQoEj1QzRlVgtjNL8PYs1A1tymZvvqkcEU7L1imkKHeDa";
    private final long tokenValidMillisecond = 1000L * 60 * 60; // 1시간 토큰 유효

    /** SecretKey 에 대해 인코딩 수행 */
    @PostConstruct
    protected void init() {
        // [init] JwtTokenProvider 내 secretKey 초기화 시작
        System.out.println(secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        System.out.println(secretKey);
        // [init] JwtTokenProvider 내 secretKey 초기화 완료
    }


    // JWT 토큰 생성
    public String createToken(String userid, List<String> roles) {
        // [createToken] 토큰 생성 시작
        Claims claims = Jwts.claims().setSubject(userid);
        claims.put("roles", roles);

        Date now = new Date();
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, secret 값 세팅
                .compact();

        // [createToken] 토큰 생성 완료
        return token;
    }

    // JWT 토큰으로 인증 정보 조회
    public Authentication getAuthentication(String token) {
        // [getAuthentication] 토큰 인증 정보 조회 시작
        UserDetails userDetails = memberDetailsService.loadUserByUsername(this.getUsername(token));
        // [getAuthentication] 토큰 인증 정보 조회 완료
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // JWT 토큰에서 회원 구별 정보 추출
    public String getUsername(String token) {
        // [getUsername] 토큰 기반 회원 구별 정보 추출
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        // [getUsername] 토큰 기반 회원 구별 정보 추출 완료
        return info;
    }

    // HTTP Request Header 에 설정된 토큰 값을 가져옴
    public String resolveToken(HttpServletRequest request) {
        // [resolveToken] HTTP 헤더에서 Token 값 추출
        return request.getHeader("X-AUTH-TOKEN");
    }

    // JWT 토큰의 유효성 + 만료일 체크
    public boolean validateToken(String token) {
        // [validateToken] 토큰 유효 체크 시작
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            // [validateToken] 토큰 유효 체크 완료
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            // [validateToken] 토큰 유효 체크 예외 발생
            return false;
        }
    }
}
