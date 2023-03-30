package com.suyang.incense.api.response.note;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class NoteRes {
    private Long id;
    private String name;
}
