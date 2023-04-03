package com.suyang.incense.api.response.perfume;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PerfumeReviewRes  {


    String name;
    double preference;
    String comment;


    @QueryProjection
    public PerfumeReviewRes(String name,double preference,String comment){
        this.name = name;
        this.preference = preference;
        this.comment = comment;
    }
}
