package com.suyang.incense.api.request.analysis;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTasteReq {

    private Long perfumeIndex;
    private double rating;

    public UpdateTasteReq() {
    }

    @QueryProjection
    public UpdateTasteReq(Long perfumeIndex, double rating) {
        this.perfumeIndex = perfumeIndex;
        this.rating = rating;
    }
}
