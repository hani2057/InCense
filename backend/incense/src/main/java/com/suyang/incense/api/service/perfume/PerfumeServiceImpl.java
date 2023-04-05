package com.suyang.incense.api.service.perfume;


import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.response.perfume.*;
import com.suyang.incense.api.request.perfume.SimilarTasteReq;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.MemberPerfume;
import com.suyang.incense.db.repository.brand.BrandRepository;
import com.suyang.incense.db.repository.member.MemberPerfumeRepository;
import com.suyang.incense.db.repository.taste.TasteRepository;
import com.suyang.incense.db.repository.note.NoteRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PerfumeServiceImpl implements PerfumeService{

    private final AuthService authService;
    private final PerfumeRepository perfumeRepository;
    private final BrandRepository brandRepository;
    private final NoteRepository noteRepository;
    private final TasteRepository tasteRepository;
    private final MemberPerfumeRepository memberPerfumeRepository;
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


    public ResponseEntity<TasteSimilarityDto> getSimilarityDataOfMine(String path, Long memberId, Long perfumeId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        String pastPreference = tasteRepository.getPreferenceByMemberId(memberId);

        SimilarTasteReq similarTasteReq = new SimilarTasteReq();
        similarTasteReq.setPreference(Objects.requireNonNullElse(pastPreference, ""));
        similarTasteReq.setNowPerfume(perfumeId);

        RequestEntity<SimilarTasteReq> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(similarTasteReq);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TasteSimilarityDto> responseEntity = restTemplate.exchange(requestEntity, TasteSimilarityDto.class);

        return responseEntity;
    }

    public ResponseEntity<SimilarPerfumeDto> getSimilarPerfumeList(String path, Long perfumeId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        Map<String, Long> requestBody = new HashMap<>();
        requestBody.put("nowPerfume", perfumeId);

        RequestEntity<Map<String, Long>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<SimilarPerfumeDto> responseEntity = restTemplate.exchange(requestEntity, SimilarPerfumeDto.class);

        return responseEntity;
    }

    public PerfumeSimpleRes getPerfumeNameAndBrand(Long perfumeId) {

        return perfumeRepository.findPerfumeNameAndBrandByPerfumeId(perfumeId);

    }

    public SimilarPerfumeRes getSimilarPerfumeResData(Long perfumeId) {

        return perfumeRepository.getSimilarPerfumeResData(perfumeId);
    }

    @Override
    public PerfumeCategoryRes getPerfumeCategoryByMember(Long perfumdId, Authentication authentication) {
        Member member = authService.getMemberByAuthentication(authentication).orElseThrow(IllegalArgumentException::new);
        Perfume perfume = perfumeRepository.findById(perfumdId).orElseThrow(IllegalArgumentException::new);
        Optional<MemberPerfume> memberPerfume = memberPerfumeRepository.findByMemberAndPerfume(member, perfume);
        return memberPerfume.map(value -> new PerfumeCategoryRes(value.getCategory().toString())).orElse(new PerfumeCategoryRes());
    }
}
