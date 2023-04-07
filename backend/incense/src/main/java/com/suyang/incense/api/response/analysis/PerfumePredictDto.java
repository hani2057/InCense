package com.suyang.incense.api.response.analysis;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PerfumePredictDto {

    private List<PerfumePredict> result = new ArrayList<>();

    @Getter
    @Setter
    public static class PerfumePredict{
        private float predict;
        private Long perfumeIndex;
    }

}
