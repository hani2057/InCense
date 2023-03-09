package com.suyang.incense.db.entity.chat;


import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.relation.ChatRoomChatMessage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chat_room")
public class ChatRoom {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;




    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sale_id")
    private Sale sale;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="share_id")
    private Share share;


    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomChatMessage> chatRoomChatMessageList = new ArrayList<>();

    @NotNull
    private Enum gubun;

    @NotNull
    @Column(length=300)
    private String title;

    @NotNull
    private LocalDateTime create_time;

}
