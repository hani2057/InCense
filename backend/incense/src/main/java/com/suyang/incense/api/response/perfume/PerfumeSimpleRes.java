package com.suyang.incense.api.response.perfume;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfumeSimpleRes {

    private String perfumeName;
    private String perfumeBrand;
    private String image;

    @QueryProjection
    public PerfumeSimpleRes(String perfumeName, String perfumeBrand, String image) {
        this.perfumeName = perfumeName;
        this.perfumeBrand = perfumeBrand;
        this.image = image;
    }
}
