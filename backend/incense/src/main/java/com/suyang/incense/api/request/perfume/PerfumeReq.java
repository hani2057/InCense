package com.suyang.incense.api.request.perfume;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class PerfumeReq {

    private String search;
    private List<String> brand;
    private List<String> scent;
    private List<String> concentration;
    private String sorted;
    private int page;
}
