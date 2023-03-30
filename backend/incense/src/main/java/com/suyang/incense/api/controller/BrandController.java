package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.brand.BrandRes;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import com.suyang.incense.api.service.brand.BrandService;
import com.suyang.incense.db.entity.perfume.Brand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Api(value = "브랜드 API", tags = {"Brand"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/brand")
@RestController
public class BrandController {

    private final BrandService brandService;
    @ApiOperation(value = "브랜드 검색 기능")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(array = @ArraySchema(schema = @Schema( implementation = BrandRes.class))))})
    @GetMapping("")
    public ResponseEntity<List<BrandRes>> searchBrandList(){
        List<BrandRes> brandResList = new ArrayList<>();
        List<Brand> brands = brandService.searchBrandList();


        for(Brand brand:brands){
          brandResList.add(
                  BrandRes.builder()
                          .id(brand.getId())
                          .name(brand.getName()).build()
          );
        }

        brandResList.add(BrandRes.builder().id((long)-1).name("기타").build());

        return ResponseEntity.ok(brandResList);
    }





}
