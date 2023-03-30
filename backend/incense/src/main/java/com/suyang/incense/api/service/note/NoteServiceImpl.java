package com.suyang.incense.api.service.note;

import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.repository.brand.BrandRepository;
import com.suyang.incense.db.repository.note.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoteServiceImpl implements NoteService{
    private final NoteRepository noteRepository;
    @Override
    public List<Note> searchNoteList() {

        return noteRepository.getNoteList();
    }

    @Override
    public List<Note> searchNotInNoteList(List<Long> noteList){
        return noteRepository.getNotInNoteList(noteList);
    }
}
