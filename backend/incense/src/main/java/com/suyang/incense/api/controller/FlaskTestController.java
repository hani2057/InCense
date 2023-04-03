package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.test.TestReq;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/ml")
@RestController
public class FlaskTestController {

    @PostMapping("/result")
    public ResponseEntity<?> tasteTest(@RequestBody TestReq testReq) {
        //dummy
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("preference", "선호 벡터...");

        return ResponseEntity.status(200).body(resultMap);
    }


}
