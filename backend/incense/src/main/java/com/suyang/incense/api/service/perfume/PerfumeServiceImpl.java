package com.suyang.incense.api.service.perfume;


import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.repository.brand.BrandRepository;
import com.suyang.incense.db.repository.note.NoteRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PerfumeServiceImpl implements PerfumeService{


    private final PerfumeRepository perfumeRepository;
    private final BrandRepository brandRepository;
    private final NoteRepository noteRepository;
    @Override
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq,Pageable pageable) {
        List<Long> brands = perfumeReq.getBrand();
        List<Long> topNotes = perfumeReq.getScent();
        List<Long> noteIdInList = new ArrayList<>();
        List<Long> brandIdInList = new ArrayList<>();

        boolean isNotInBrand = false;
        boolean isNotInTopNotes = false;

        if(brands!=null){
            for(Long bid:brands){
                if(bid==-1){
                    isNotInBrand = true;

                    brands.remove(new Long(-1));
                    break;
                }
            }
        }

        if(topNotes!=null){
            for(Long tid:topNotes){
                if(tid==-1){
                    isNotInTopNotes = true;
                    topNotes.remove(new Long(-1));
                    break;
                }
            }
        }



        if(isNotInTopNotes){

            List<Note> noteInList = noteRepository.getNoteList();
            for(Note note:noteInList){
                noteIdInList.add(note.getId());
            }
            List<Note> notInNoteList = noteRepository.getNotInNoteList(noteIdInList);
            for(Note note:notInNoteList){
                topNotes.add(note.getId());
            }
        }

        if(isNotInBrand){
            List<Brand> brandInList = brandRepository.getBrandList();

            for(Brand brand:brandInList){
                brandIdInList.add(brand.getId());
            }

            List<Brand> notInBrandList = brandRepository.getNotInBrandList(brandIdInList);

            for(Brand brand:notInBrandList){
                brands.add(brand.getId());
            }
        }

        return perfumeRepository.getPerfumeList(perfumeReq,pageable);
    }
    @Override
    public Long getCount(PerfumeReq perfumeReq){
        return perfumeRepository.getCount(perfumeReq);
    }
    @Override
    public Perfume getPerfume(Long perfumeId){
          return  perfumeRepository.findById(perfumeId).get();
    }
}
