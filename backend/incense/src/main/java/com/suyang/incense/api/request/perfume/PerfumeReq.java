package com.suyang.incense.api.request.perfume;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class PerfumeReq {

    private String search;
    private List<Long> brand;
    private List<Long> scent;
    private List<String> concentration;
    private String sorted;
    private int page = 0;
}
