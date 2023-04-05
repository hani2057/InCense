package com.suyang.incense.api.service.member;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.suyang.incense.api.response.member.LoginRes;
import com.suyang.incense.api.response.member.kakao.KakaoTokenRes;
import com.suyang.incense.api.response.member.kakao.KakaoUserInfoRes;
import com.suyang.incense.api.response.member.naver.NaverTokenRes;
import com.suyang.incense.api.response.member.naver.NaverUserInfoRes;
import com.suyang.incense.common.auth.MemberDetails;
import com.suyang.incense.common.util.JwtTokenUtil;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.member.SocialType;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;

    @Override
    public KakaoTokenRes getKakakoAccessToken(String code) {
        // 인가코드로 Kakao AccessToken 가져오기
        RestTemplate restTemplate = new RestTemplate();

        // HttpHeader 객체 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "219f3d4b6069d9e1cbc39012ba719f67");
//        params.add("redirect_uri", "http://localhost:3000/oauth/callback/kakao");
        params.add("redirect_uri", "https://j8a804.p.ssafy.io/oauth/callback/kakao");
        params.add("code", code);

        // HttpEntity 객체 생성 = HttpBody + HttpHeader
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // Json -> String
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokenRes kakaoToken = null;
        try {
            kakaoToken = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenRes.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoToken;
    }

    @Override
    public String getKakaoUserInfo(String kakaoAccessToken) {
        // Kakao AccessToken으로 Kakao User 정보 가져오기
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoInfoRequest = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoInfoResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoInfoRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoUserInfoRes kakaoUserInfo = null;
        try {
            kakaoUserInfo = objectMapper.readValue(kakaoInfoResponse.getBody(), KakaoUserInfoRes.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        assert kakaoUserInfo != null;
        return kakaoUserInfo.getKakao_account().getEmail();
    }

    @Override
    public NaverTokenRes getNaverAccessToken(String code) {

        // 인가코드로 Kakao AccessToken 가져오기
        RestTemplate restTemplate = new RestTemplate();

        // HttpHeader 객체 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "N3pZgno1b_CSURFjx9Yw");
        params.add("client_secret", "DH3n6_yKPL");
        params.add("code", code);
        params.add("state", "1234");

        // HttpEntity 객체 생성 = HttpBody + HttpHeader
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // Json -> String
        ObjectMapper objectMapper = new ObjectMapper();
        NaverTokenRes naverToken = null;
        try {
            naverToken = objectMapper.readValue(accessTokenResponse.getBody(), NaverTokenRes.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return naverToken;
    }

    @Override
    public String getNaverUserInfo(String naverAccessToken) {

        // Kakao AccessToken으로 Kakao User 정보 가져오기
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + naverAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> naverInfoRequest = new HttpEntity<>(headers);

        ResponseEntity<String> naverInfoResponse = restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverInfoRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        NaverUserInfoRes naverUserInfo = null;
        try {
            naverUserInfo = objectMapper.readValue(naverInfoResponse.getBody(), NaverUserInfoRes.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        assert naverUserInfo != null;
        return naverUserInfo.getResponse().getEmail();
    }

    @Override
    public LoginRes isExistUser(String email, String type) {
        // 기존 회원 (true)과 신입 회원 (false) 구분
        Optional<Member> member = memberRepository.findByEmailAndType(email, SocialType.valueOf(type));
        LoginRes loginRes = null;
        if(member.isPresent()) {  // 기존 회원일때
            Member user = member.get();
            String token = getToken(user.getEmail());
            loginRes = new LoginRes(token, user.getNickname(),null, null);
        } else {    // 신입 회원일때
            loginRes = new LoginRes(null,null, email, type);
        }
        return loginRes;
    }

    @Override
    public String getToken(String email) {
        return JwtTokenUtil.getToken(email);
    }

    @Override
    public Long getIdByAuthentication(Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        return memberDetails.getMember().getId();
    }

    @Override
    public Optional<Member> getMemberByAuthentication(Authentication authentication) {
        return memberRepository.findById(getIdByAuthentication(authentication));
    }


}
