package com.suyang.incense.api.service.member;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.suyang.incense.api.response.member.auth.kakao.KakaoTokenRes;
import com.suyang.incense.api.response.member.auth.kakao.KakaoUserInfoRes;
import com.suyang.incense.db.entity.member.SocialType;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

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
        params.add("redirect_uri", "http://localhost:3000/oauth/callback/kakao");
        params.add("code", code);

        // HttpEntity 객체 생성 = HttpBody + HttpHeader
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
        System.out.println(kakaoTokenRequest);

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
    public String GetKakaoUserInfo(String kakaoAccessToken) {
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
    public boolean isExistUser(String email, String type) {
        // 기존 회원 (true)과 신입 회원 (false) 구분
        return memberRepository.findByEmailAndType(email, SocialType.valueOf(type)).isPresent();
    }
}
