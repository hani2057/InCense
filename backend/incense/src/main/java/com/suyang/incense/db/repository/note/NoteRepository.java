package com.suyang.incense.db.repository.note;

import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.repository.brand.BrandCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Long>, NoteCustomRepository {
}
