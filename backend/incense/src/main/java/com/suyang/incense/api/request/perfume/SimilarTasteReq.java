package com.suyang.incense.api.request.perfume;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimilarTasteReq {

    private String preference;
    private Long nowPerfume;
}
