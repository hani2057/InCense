package com.suyang.incense.api.request.perfume;

public enum PerfumeSort {
    POPULAR("popular"),COMMENT("comment"),COMMON("common");

    private final String name;
    PerfumeSort(String name){
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
