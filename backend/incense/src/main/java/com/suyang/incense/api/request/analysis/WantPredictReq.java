package com.suyang.incense.api.request.analysis;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class WantPredictReq {

    private String preference;
    private List<Long> wantPerfume = new ArrayList<>();
}
