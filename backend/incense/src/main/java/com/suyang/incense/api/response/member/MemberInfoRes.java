package com.suyang.incense.api.response.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberInfoRes {

    // Grade
    private String grade_name;

    // Member
    private String email;
    private String type;
    private String nickname;
    private Byte gender;
    private LocalDate birth;
    private String profile;
    private byte birthOpen;
    private byte genderOpen;
    private byte alarmOpen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime lastTime;

}
