package com.suyang.incense.api.response.perfume;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class PerfumeRes {
    private Long id;
    private String name;
    private String brandName;
    private List<String> topNoteName;
    private List<String> middleNoteName;
    private List<String> baseNoteName;
    private double price;
    private int volume;
    private byte gender;
    private double rating;
    private String image;

    private String concentration;

}
