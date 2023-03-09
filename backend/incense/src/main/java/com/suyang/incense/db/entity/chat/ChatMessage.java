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
@Table(name = "chat_message")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_message_id")
    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;



    @OneToMany(mappedBy = "chatMessage")
    private List<ChatRoomChatMessage> chatRoomChatMessageList = new ArrayList<>();

    @NotNull
    private String content;



    @NotNull
    private LocalDateTime chatTime;

}
