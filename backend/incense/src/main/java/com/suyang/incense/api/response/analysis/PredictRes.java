package com.suyang.incense.api.response.analysis;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictRes {

    private Long perfumeId;
    private String perfumeName;
    private String perfumeBrand;
    private float predict;
    private String image;

}
