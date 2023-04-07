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
import org.springframework.transaction.annotation.Transactional;

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
        List<Member> members = memberRepository.getAlarmMembers(deal.getPerfume().getId());
        AlarmSendRes alarmSendRes = AlarmSendRes.builder()
                .dealId(deal.getId())
                .dealTitle(deal.getTitle())
                .perfumeName(deal.getPerfume().getName())
                .build();
        insertAlarmToMembers(members,deal);
        sendAlarmToMembers(members,alarmSendRes);
    }

    @Async
    public void sendAlarmToMembers(List<Member> members,AlarmSendRes alarmSendRes){
       for(Member member:members){
           sendNotification(member.getNickname(),alarmSendRes);
       }
    }


    public void insertAlarmToMembers(List<Member> members,Deal deal){
        for(Member member:members){
           insertAlarmSend(deal,member);
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

    @Transactional
    @Override
    public void deleteMemberAlarmPerfume(Long perfumeId, Long memberId){
        memberAlarmPerfumeRepository.removeMemberPerfumeAlarm(perfumeId,memberId);
    }

    public void insertAlarmSend(Deal deal, Member member){
        AlarmSend alarmSend = new AlarmSend();
        alarmSend.setDeal(deal);
        alarmSend.setMember(member);
        alarmSend.setMessage(deal.getContent());
        alarmSend.setIsDeleted((byte)0);
        alarmSend.setIsReceived((byte)0);

        alarmSendRepository.save(alarmSend);
    }

    @Override
    public long getIsAlarm(Long perfumeId, Long memberId){
       return memberAlarmPerfumeRepository.getIsAlarm(perfumeId,memberId);
    }
    @Transactional
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

    @Transactional
    @Override
    public void readAlarmAll(Long memberId) {
        List<AlarmSend> alarmSendList= alarmSendRepository.getAlarmSendList(memberId);
        for(AlarmSend alarmSend:alarmSendList){
            alarmSend.setIsReceived((byte)1);
            alarmSendRepository.save(alarmSend);
        }
    }


    public void sendNotification(String nickname, AlarmSendRes alarmSendRes) {
        String destination = "/sub/notification/" +nickname;
        simpMessagingTemplate.convertAndSend(destination,"나눔/판매 알람이 왔습니다:" + alarmSendRes.getDealTitle());
    }


}
