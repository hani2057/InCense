package com.suyang.incense.api.response.perfume;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimilarPerfumeRes {

    private Long perfumeId;
    private String perfumeName;
    private String perfumeBrand;
    private String image;

    @QueryProjection
    public SimilarPerfumeRes(Long perfumeId, String perfumeName, String perfumeBrand, String image) {
        this.perfumeId = perfumeId;
        this.perfumeName = perfumeName;
        this.perfumeBrand = perfumeBrand;
        this.image = image;
    }
}
