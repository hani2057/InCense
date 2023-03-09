package com.suyang.incense.db.entity.relation;


import com.querydsl.core.Fetchable;
import com.suyang.incense.db.entity.chat.ChatMessage;
import com.suyang.incense.db.entity.chat.ChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chat_room_chat_message")
public class ChatRoomChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_chat_message_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chat_message_id")
    private ChatMessage chatMessage;


}
