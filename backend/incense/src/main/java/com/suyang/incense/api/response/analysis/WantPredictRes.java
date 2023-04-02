package com.suyang.incense.api.response.analysis;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WantPredictRes {

    private Long perfumeId;
    private String perfumeName;
    private String perfumeBrand;
    private double predict;

}
