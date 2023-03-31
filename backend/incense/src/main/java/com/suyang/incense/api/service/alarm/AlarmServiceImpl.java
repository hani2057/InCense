package com.suyang.incense.api.service.alarm;

import com.suyang.incense.api.response.alarm.AlarmSendRes;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.member.AlarmSend;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.MemberPerfumeAlarm;
import com.suyang.incense.db.repository.alarm.AlarmSendRepository;
import com.suyang.incense.db.repository.alarm.MemberAlarmPerfumeRepository;
import com.suyang.incense.db.repository.deal.DealRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final MemberAlarmPerfumeRepository memberAlarmPerfumeRepository;
    private final AlarmSendRepository alarmSendRepository;

    private final DealRepository dealRepository;

    @Override
    public void sendAlarmToAllMembers(Deal deal){
        System.out.println("알람 전송 시작!!!");
        List<Member> members = memberRepository.getAlarmMembers(deal.getPerfume().getId());
        AlarmSendRes alarmSendRes = AlarmSendRes.builder()
                .dealId(deal.getId())
                .dealTitle(deal.getTitle())
                .perfumeName(deal.getPerfume().getName())
                .build();
        sendAlarmToMembers(members,alarmSendRes);
    }

    @Async
    public void sendAlarmToMembers(List<Member> members,AlarmSendRes alarmSendRes){
//        sendNotification((long)1,alarmSendRes);

       for(Member member:members){
           sendNotification(member.getId(),alarmSendRes);
       }
    }

    @Override
    public void setMemberAlarmPerfume(Long perfumeId, Long memberId){
        Perfume perfume = perfumeRepository.findById(perfumeId).get();
        Member member = memberRepository.findById(memberId).get();
        MemberPerfumeAlarm memberPerfumeAlarm = new MemberPerfumeAlarm();
        memberPerfumeAlarm.setPerfume(perfume);
        memberPerfumeAlarm.setMember(member);

        memberAlarmPerfumeRepository.save(memberPerfumeAlarm);
    }

    @Override
    public void deleteMemberAlarmPerfume(Long perfumeId, Long memberId){
        memberAlarmPerfumeRepository.removeMemberPerfumeAlarm(perfumeId,memberId);
    }

    @Override
    public void insertAlarmSend(Long dealId, Long memberId){
        AlarmSend alarmSend = new AlarmSend();

        Deal deal = dealRepository.findById(dealId).get();
        Member member = memberRepository.findById(memberId).get();

        alarmSend.setId(dealId);
        alarmSend.setId(memberId);

        alarmSendRepository.save(alarmSend);

    }

    @Override
    public List<AlarmSend> getAlarmSendList(Long memberId){
         return alarmSendRepository.getAlarmSendList(memberId);
    }

    @Override
    public void readAlarm(Long alarmSendId){
        AlarmSend alarmSend = alarmSendRepository.findById(alarmSendId).get();
        alarmSend.setIsReceived((byte)1);
        alarmSendRepository.save(alarmSend);

    }

    @Override
    public void deleteAlarmSend(Long alarmSendId){
        AlarmSend alarmSend = alarmSendRepository.findById(alarmSendId).get();
        alarmSend.setIsDeleted((byte)1);
        alarmSendRepository.save(alarmSend);
    }


    public void sendNotification(Long id, AlarmSendRes alarmSendRes) {
        String destination = "/sub/notification/" +id;
        simpMessagingTemplate.convertAndSend(destination,alarmSendRes);
    }


}
