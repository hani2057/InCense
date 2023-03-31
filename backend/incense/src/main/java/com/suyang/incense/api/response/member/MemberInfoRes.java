package com.suyang.incense.api.response.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class MemberInfoRes {

    // Grade
    private String grade_name;

    // Member
    private String nickname;
    private Byte gender;
    private LocalDate birth;
    private String profile;
    private byte birthOpen;
    private byte genderOpen;
    private byte alarmOpen;

}
