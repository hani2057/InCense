package com.suyang.incense.api.request.perfume;

public enum PerfumeSort {
    POPULAR("popular"),COMMENT("comment"),RECENT("recent");

    private final String name;
    PerfumeSort(String name){
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
