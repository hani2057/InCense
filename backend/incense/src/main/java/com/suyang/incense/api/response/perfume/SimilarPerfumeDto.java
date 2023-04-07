package com.suyang.incense.api.response.perfume;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SimilarPerfumeDto {

    private List<Long> similarPerfumes = new ArrayList<>();
}
