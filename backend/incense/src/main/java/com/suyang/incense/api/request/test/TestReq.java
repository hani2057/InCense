package com.suyang.incense.api.request.test;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TestReq {

    private List<Integer> choose = new ArrayList<>();
    private String pastPreference;


}
