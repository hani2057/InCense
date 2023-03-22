package com.suyang.incense.api.request.perfume;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PerfumeReq {

    private String search;
    private List<String> brand;
    private List<String> scent;
    private String concentration;
    private String sorted;
    private int page;
}
