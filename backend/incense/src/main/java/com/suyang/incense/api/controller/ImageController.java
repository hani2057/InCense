package com.suyang.incense.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Api(value = "이미지 조회 API", tags = {"Image Display"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/display")
public class ImageController {

    @ApiOperation(value = "이미지 조회")
    @GetMapping
    public ResponseEntity<?> display(@RequestParam("filename") String filename){

        //서버 경로 지정
        String path = "/asset/images/";

        Resource resource = new FileSystemResource(path + filename);
        if(!resource.exists()){
//            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
            return ResponseEntity.status(404).body(path + filename);
        }
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        try {
            filePath = Paths.get(path + filename);
            header.add("Content-type", Files.probeContentType(filePath));
        } catch (IOException e){
            e.printStackTrace();
        }
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }


}
