package com.suyang.incense.api.response.perfume;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TasteSimilarityDto {

    private Double predictRate;
    private List<String> favNotes;
    private List<String> worNotes;
}
