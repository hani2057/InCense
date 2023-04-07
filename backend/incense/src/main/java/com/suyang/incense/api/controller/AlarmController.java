package com.suyang.incense.api.controller;


import com.suyang.incense.api.response.alarm.AlarmRes;
import com.suyang.incense.api.response.alarm.AlarmSendRes;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import com.suyang.incense.api.service.alarm.AlarmService;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.member.AlarmSend;
import com.suyang.incense.db.entity.perfume.Perfume;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Api(value = "알람 API", tags = {"Alarm"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/alarm")
@RestController
public class AlarmController {
    private final AlarmService alarmService;
    private final AuthService authService;



    @ApiOperation(value = "향수 알람 설정하기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @PostMapping(path="/{perfume_id}")
    public ResponseEntity<String> setAlarm(@PathVariable("perfume_id") Long perfumeId,@ApiIgnore Authentication authentication){
        Long memberId = authService.getIdByAuthentication(authentication);
        alarmService.setMemberAlarmPerfume(perfumeId,memberId);
        return ResponseEntity.ok("success");
    }

    @ApiOperation(value = "향수 알람 삭제하기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @DeleteMapping(path="/{perfume_id}")
    public ResponseEntity<String> deleteAlarm(@PathVariable("perfume_id") Long perfumeId,@ApiIgnore Authentication authentication){
        Long memberId = authService.getIdByAuthentication(authentication);
        alarmService.deleteMemberAlarmPerfume(perfumeId,memberId);
        return ResponseEntity.ok("success");
    }

    @ApiOperation(value = "향수 알람 설정 확인")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @GetMapping(path="/{perfume_id}")
    public ResponseEntity<Long> getIsAlarm(@PathVariable("perfume_id") Long perfumeId,@ApiIgnore Authentication authentication){
        Long memberId = authService.getIdByAuthentication(authentication);
        Long res = alarmService.getIsAlarm(perfumeId,memberId);
        return ResponseEntity.ok(res);
    }

    @ApiOperation(value = "향수 알람 수신 삭제")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @DeleteMapping(path="/send/{alarm_send_id}")
    public ResponseEntity<String> deleteAlarmSend(@PathVariable("alarm_send_id") Long alarmSendId){
        alarmService.deleteAlarmSend(alarmSendId);
        return ResponseEntity.ok("success");
    }

    @ApiOperation(value = "향수 알람 읽음 표시")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @PutMapping(path="/send/{alarm_send_id}")
    public ResponseEntity<String> readAlarm(@PathVariable("alarm_send_id") Long alarmSendId){
        alarmService.readAlarm(alarmSendId);
        return ResponseEntity.ok("success");
    }


    @ApiOperation(value = "향수 알람 전체 읽음")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @PutMapping(path="/send")
    public ResponseEntity<String> readAlarmAll(@ApiIgnore Authentication authentication){
        Long memberId = authService.getIdByAuthentication(authentication);
        alarmService.readAlarmAll(memberId);
        return ResponseEntity.ok("success");
    }



    @ApiOperation(value = "향수 알람 수신 목록 가져오기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = AlarmSendRes.class)))})
    @GetMapping(path="/send")
    public ResponseEntity<List<AlarmSendRes>> getAlarmSendList(@ApiIgnore Authentication authentication){
        Long memberId = authService.getIdByAuthentication(authentication);

        List<AlarmSend> alarmSendList = alarmService.getAlarmSendList(memberId);
        List<AlarmSendRes> alarmSendResList = new ArrayList<>();
        LocalDateTime currentTime = LocalDateTime.now();
        for(AlarmSend alarmSend:alarmSendList){
            Duration duration = Duration.between(alarmSend.getCreatedDate(),currentTime);
            alarmSendResList.add(
                    AlarmSendRes.builder()
                            .id(alarmSend.getId())
                            .dealId(alarmSend.getDeal().getId())
                            .dealTitle(alarmSend.getDeal().getTitle())
                            .perfumeName(alarmSend.getDeal().getPerfume().getName())
                            .isReceived(alarmSend.getIsReceived())
                            .brandName(alarmSend.getDeal().getPerfume().getBrand().getName())
                            .createAt(duration.toMinutes())
                            .build()
            );
        }

        return ResponseEntity.ok(alarmSendResList);
    }



}
