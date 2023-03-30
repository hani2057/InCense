package com.suyang.incense.db.repository.note;

import com.suyang.incense.db.entity.note.Note;

import java.util.List;

public interface NoteCustomRepository {
    List<Note> getNoteList();

    List<Note> getNotInNoteList(List<Long> noteList);
}
