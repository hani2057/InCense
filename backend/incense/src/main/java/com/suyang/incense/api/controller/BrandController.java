package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.brand.BrandRes;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/brand")
@RestController
public class BrandController {


//    @ApiOperation(value = "향수 목록 검색 기능")
//    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
//            content = @Content(array = @ArraySchema(schema = @Schema( implementation = PerfumeRes.class))))})
//    @GetMapping(path="")
    @ApiOperation(value = "브랜드 검색 기능")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(array = @ArraySchema(schema = @Schema( implementation = BrandRes.class))))})
    @GetMapping("")
    public ResponseEntity<List<BrandRes>> searchBrandList(){
        List<BrandRes> brandResList = new ArrayList<>();
        return ResponseEntity.ok(brandResList);
    }



}
