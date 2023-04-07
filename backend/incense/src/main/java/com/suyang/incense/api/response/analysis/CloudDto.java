package com.suyang.incense.api.response.analysis;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CloudDto {

    private List<WordDto> cloud = new ArrayList<>();

    @Getter
    @Setter
    public static class WordDto{
        private String text;
        private float value;

    }

}
