package com.suyang.incense.api.service.alarm;

import com.suyang.incense.api.response.alarm.AlarmRes;
import com.suyang.incense.api.response.alarm.AlarmSendRes;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.repository.member.MemberRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class AlarmServiceImpl implements AlarmService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final MemberRepository memberRepository;
    private final PerfumeRepository perfumeRepository;
    @Override
    public void sendAlarmToAllMembers(Deal deal){
        List<Member> members = perfumeRepository.getAlarmMembers(deal.getPerfume().getId());
        AlarmSendRes alarmSendRes = AlarmSendRes.builder()
                .dealId(deal.getId())
                .dealTitle(deal.getTitle())
                .perfumeName(deal.getPerfume().getName())
                .build();
        sendAlarmToMembers(members,alarmSendRes);
    }

    @Async
    public void sendAlarmToMembers(List<Member> members,AlarmSendRes alarmSendRes){
        sendNotification((long)1,alarmSendRes);
//       for(Member member:members){
//           sendNotification(member.getId(),alarmSendRes);
//       }
    }

    public void sendNotification(Long id, AlarmSendRes alarmSendRes) {
        String destination = "/sub/notification/" +id;
        simpMessagingTemplate.convertAndSend(destination,alarmSendRes);
    }


}
