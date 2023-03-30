package com.suyang.incense.api.controller;


import com.suyang.incense.api.response.alarm.AlarmRes;
import com.suyang.incense.api.response.alarm.AlarmSendRes;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import com.suyang.incense.api.service.alarm.AlarmService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "알람 API", tags = {"Alarm"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/alarm")
@RestController
public class AlarmController {
    private final AlarmService alarmService;

    @ApiOperation(value = "향수 알람 설정하기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @PostMapping(path="/{alarm_id}")
    public ResponseEntity<String> setAlarm(){
        return ResponseEntity.ok("success");
    }
    @ApiOperation(value = "향수 알람 수신 삭제")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @DeleteMapping(path="/send/{alarm_send_id}")
    public ResponseEntity<String> deleteAlarmSend(){

        return ResponseEntity.ok("success");
    }
    @ApiOperation(value = "향수 알람 수신 목록 가져오기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = AlarmSendRes.class)))})
    @GetMapping(path="/send")
    public ResponseEntity<List<AlarmSendRes>> getAlarmSendList(){
        List<AlarmSendRes> alarmSendResList = new ArrayList<>();

        return ResponseEntity.ok(alarmSendResList);
    }

    @ApiOperation(value = "알람 테스트")
    @GetMapping("/send/test")
    public void sendTest(){
        alarmService.sendAlarmToAllMembers();
    }
}
