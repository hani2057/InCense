package com.suyang.incense.db.repository.note;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.note.Type;
import com.suyang.incense.db.entity.perfume.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.note.QNote.note;
import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
import static com.suyang.incense.db.entity.relation.QPerfumeNote.perfumeNote;


@RequiredArgsConstructor
@Repository
public class NoteCustomRepositoryImpl {

  private final JPAQueryFactory jpaQueryFactory;


  public List<Note> getNoteList(){
    List<Note> notes = jpaQueryFactory.select(note)
            .from(note)
            .leftJoin(note.perfumeNoteList,perfumeNote)
            .where(note.type.eq(Type.TOP))
            .orderBy(note.id.count().desc())
            .groupBy(note)
            .offset(0)
            .limit(6)
            .fetch();
    return notes;
  }


  public List<Note> getNotInBrandList(List<Note> noteList){
    List<Note> notes = jpaQueryFactory.select(note)
            .from(note)
            .leftJoin(note.perfumeNoteList,perfumeNote)
            .where(note.notIn(noteList),note.type.eq(Type.TOP))
            .orderBy(note.id.count().desc())
            .groupBy(note)
            .fetch();
    return notes;
  }
}
