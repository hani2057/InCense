package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.analysis.UpdateTasteReq;
import com.suyang.incense.api.request.analysis.WantPredictReq;
import com.suyang.incense.api.request.perfume.SimilarTasteReq;
import com.suyang.incense.api.request.test.TestReq;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping("/predict/detail")
    public ResponseEntity<?> nowPerfumeTastePredict(@RequestBody SimilarTasteReq similarTasteReq) {

        //dummy
        List<String> favNotes = new ArrayList<>();
        List<String> worNotes = new ArrayList<>();
        favNotes.add("Floral"); favNotes.add("Musk"); favNotes.add("Spicy");
        worNotes.add("Wood"); worNotes.add("Oriental");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("predictRate", 4.92);
        jsonObject.put("favNotes", favNotes);
        jsonObject.put("worNotes", worNotes);

        System.out.println("json object................................................");
        System.out.println(jsonObject);

        return ResponseEntity.status(200).body(jsonObject);
    }

    @PostMapping("/predict/detail/similar")
    public ResponseEntity<?> similarPerfumeList(@RequestBody Map<String, String> nowPerfume) {

        System.out.println("nowPerfume.....................................: "+nowPerfume);

        //dummy
        List<Long> similarPerfumes = new ArrayList<>();
        similarPerfumes.add(255L); similarPerfumes.add(10L); similarPerfumes.add(20L);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("similarPerfumes", similarPerfumes);

        return ResponseEntity.status(200).body(jsonObject);
    }

    @PostMapping("/word")
    public ResponseEntity<?> wordCloud(@RequestBody Map<String, String> preference) {

        //dummy
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("word", "Floral");
        jsonObject.put("weight", 0.9817);
        jsonArray.add(jsonObject);

        JSONObject result = new JSONObject();
        result.put("cloud", jsonArray);

        return ResponseEntity.status(200).body(result);

    }

    @PostMapping("/graph")
    public ResponseEntity<?> noteGraph(@RequestBody Map<String, String> preference) {

        //dummy
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("mainScent", "Vanilla");

        JSONArray middleList = new JSONArray();
        JSONObject middleObj1 = new JSONObject();
        middleObj1.put("word", "Floral");
        middleObj1.put("weight", 0.9817);
        JSONObject middleObj2 = new JSONObject();
        middleObj2.put("word", "Musk");
        middleObj2.put("weight", 0.8877);
        middleList.add(middleObj1);
        middleList.add(middleObj2);

        jsonObject.put("middleWeight", middleList);

        JSONArray baseList = new JSONArray();
        JSONObject baseObj1 = new JSONObject();
        baseObj1.put("word", "Floral");
        baseObj1.put("weight", 0.2345);
        JSONObject baseObj2 = new JSONObject();
        baseObj2.put("word", "Spicy");
        baseObj2.put("weight", 0.1111);
        baseList.add(baseObj1);
        baseList.add(baseObj2);

        jsonObject.put("baseWeight", baseList);

        return ResponseEntity.status(200).body(jsonObject);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTaste(@RequestBody Map<String, List<UpdateTasteReq>> request) {

        //request data 확인
        System.out.println("request data check...............................................");
        System.out.println("first idx: " + request.get("perfumes").get(0).getPerfumeIndex());
        System.out.println("first rating: " + request.get("perfumes").get(0).getRating());
        System.out.println("second idx: " + request.get("perfumes").get(1).getPerfumeIndex());
        System.out.println("second rating: " + request.get("perfumes").get(1).getRating());
        System.out.println("third idx: " + request.get("perfumes").get(2).getPerfumeIndex());
        System.out.println("third rating: " + request.get("perfumes").get(2).getRating());

        //dummy
        Map<String, String> result = new HashMap<>();
        result.put("preference", "업데이트 된 선호 벡터");

        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/predict/want")
    public ResponseEntity<?> wantPredict(@RequestBody WantPredictReq wantPredictReq) {

        //request data 확인
        System.out.println("request data check...............................................");
        System.out.println("preference: "+wantPredictReq.getPreference());
        for(Long id : wantPredictReq.getWantPerfume()){
            System.out.print(id + " ");
        }

        //dummy
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("predict", 4.813);
        jsonObject.put("perfumeIndex", 12);
        jsonArray.add(jsonObject);

        JSONObject result = new JSONObject();
        result.put("result", jsonArray);

        return ResponseEntity.status(200).body(result);

    }

    @PostMapping("/predict/all")
    public ResponseEntity<?> allPredict(@RequestBody Map<String, String> preference) {

        //dummy
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("predict", 4.813);
        jsonObject.put("perfumeIndex", 12);
        jsonArray.add(jsonObject);

        JSONObject result = new JSONObject();
        result.put("result", jsonArray);

        return ResponseEntity.status(200).body(result);


    }
}
