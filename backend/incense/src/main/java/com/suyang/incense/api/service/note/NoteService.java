package com.suyang.incense.api.service.note;

import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.perfume.Brand;

import java.util.List;

public interface NoteService{

    public List<Note> searchNoteList();

    public List<Note> searchNotInNoteList(List<Long> noteList);
}
