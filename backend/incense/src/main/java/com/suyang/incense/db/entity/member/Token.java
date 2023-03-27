package com.suyang.incense.db.entity.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@Table(name = "Token")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_key", nullable = false)
    private Long key;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    @Builder
    public Token(Long key, Long userId, String refreshToken) {
        this.key = key;
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
