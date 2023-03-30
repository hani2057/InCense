package com.suyang.incense.api.service.alarm;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AlarmServiceImpl implements AlarmService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final MemberRepository memberRepository;


    public void sendAlarmToAllMembers(){
        List<Member> members = memberRepository.findAll();
        sendAlarmToMembers(members);
    }
    @Async
    public void sendAlarmToMembers(List<Member> members){
       for(Member member:members){
           sendNotification(member.getId(),"hello");
       }

    }
    public void sendNotification(Long id,String message) {
        String destination = "/topic/notification/" +id;
        simpMessagingTemplate.convertAndSend(destination, message);
    }
}
