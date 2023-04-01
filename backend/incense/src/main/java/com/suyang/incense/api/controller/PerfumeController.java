package com.suyang.incense.api.controller;


import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import com.suyang.incense.api.service.perfume.PerfumeService;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.PerfumeNote;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "향수 API", tags = {"Perfume"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/perfume")
@RestController
public class PerfumeController {

    private final int PAGE_CNT = 20;
    private final PerfumeService perfumeService;

    @ApiOperation(value = "향수 목록 검색 기능")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(array = @ArraySchema(schema = @Schema( implementation = PerfumeRes.class))))})
    @PostMapping(path="/in")
    public ResponseEntity<Page<PerfumeRes>> getPerfumeList(@RequestBody PerfumeReq perfumeReq){
        System.out.println(perfumeReq.getSearch()+"search!!!");
        Pageable pageable = PageRequest.of(perfumeReq.getPage()-1<0?0:perfumeReq.getPage()-1,PAGE_CNT);
        List<Perfume> perfumeList = perfumeService.getPerfumeList(perfumeReq,pageable);
        List<PerfumeRes>perfumeResList = new ArrayList<>();

        for(Perfume perfume:perfumeList) {
            List<String> topNoteName = new ArrayList<>();
            List<String> middleNoteName = new ArrayList<>();
            List<String> baseNoteName = new ArrayList<>();

            for (PerfumeNote perfumeNote : perfume.getPerfumeNoteList()) {
                String noteName = perfumeNote.getNote().getName();
                switch (perfumeNote.getNote().getType()) {
                    case TOP:
                        topNoteName.add(noteName);
                        break;
                    case MIDDLE:
                        middleNoteName.add(noteName);
                        break;
                    case BASE:
                        baseNoteName.add(noteName);
                        break;
                }
            }

            PerfumeRes perfumeRes = PerfumeRes.builder().brandName(perfume.getBrand().getName())
                    .name(perfume.getName())
                    .id(perfume.getId())
                    .topNoteName(topNoteName)
                    .baseNoteName(baseNoteName)
                    .middleNoteName(middleNoteName)
                    .price(perfume.getPrice())
                    .volume(perfume.getVolume())
                    .gender(perfume.getGender())
                    .rating(perfume.getRating())
                    .image(perfume.getImage())
                    .concentration(perfume.getConcentration())
                    .build();

            perfumeResList.add(perfumeRes);
        }
        Long totalCount = perfumeService.getCount(perfumeReq);
        Page<PerfumeRes> perfumeResPages= PageableExecutionUtils.getPage(perfumeResList, pageable, () -> totalCount);
        return ResponseEntity.ok(perfumeResPages);
    }

    @ApiOperation(value = "향수 상세 검색")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = PerfumeRes.class)))})
    @GetMapping(path="/{perfume_id}")
    public ResponseEntity <PerfumeRes> getPerfume(@PathVariable("perfume_id") Long perfumeId){
        Perfume perfume = perfumeService.getPerfume(perfumeId);


        List<String> topNoteName = new ArrayList<>();
        List<String> middleNoteName = new ArrayList<>();
        List<String> baseNoteName = new ArrayList<>();

        for(PerfumeNote perfumeNote: perfume.getPerfumeNoteList()){
            String noteName = perfumeNote.getNote().getName();
            switch(perfumeNote.getNote().getType()){
                case TOP:
                    topNoteName.add(noteName);
                    break;
                case MIDDLE:
                    middleNoteName.add(noteName);
                    break;
                case BASE:
                    baseNoteName.add(noteName);
                    break;
            }

        }

        PerfumeRes perfumeRes = PerfumeRes.builder().brandName(perfume.getBrand().getName())
                .name(perfume.getName())
                .id(perfume.getId())
                .topNoteName(topNoteName)
                .baseNoteName(baseNoteName)
                .middleNoteName(middleNoteName)
                .price(perfume.getPrice())
                .volume(perfume.getVolume())
                .gender(perfume.getGender())
                .rating(perfume.getRating())
                .image(perfume.getImage())
                .build();

        return ResponseEntity.ok(perfumeRes);
    }


    @ApiOperation(value = "취향 유사도 확인")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @GetMapping(path="/similarity")
    public ResponseEntity<String> getSimilarity(){
        return ResponseEntity.ok("향수 유사도 확인");
    }
}
