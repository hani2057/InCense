package com.suyang.incense.api.response.brand;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class BrandRes {
  private Long id;
  private String name;
}
