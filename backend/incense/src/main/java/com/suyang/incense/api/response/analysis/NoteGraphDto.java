package com.suyang.incense.api.response.analysis;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class NoteGraphDto {

    private String mainScent;
    private List<NoteInfo> middleWeight = new ArrayList<>();
    private List<NoteInfo> baseWeight = new ArrayList<>();

    @Getter
    @Setter
    public static class NoteInfo{

        private String word;
        private float weight;

    }
}
