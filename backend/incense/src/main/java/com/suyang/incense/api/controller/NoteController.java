package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.brand.BrandRes;
import com.suyang.incense.api.response.note.NoteRes;
import com.suyang.incense.api.service.brand.BrandService;
import com.suyang.incense.api.service.note.NoteService;
import com.suyang.incense.db.entity.note.Note;
import com.suyang.incense.db.entity.perfume.Brand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
@Api(value = "노트 API", tags = {"Note"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/note")
@RestController
public class NoteController {
  private final NoteService noteService;
  @ApiOperation(value = "Note 검색")
  @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
          content = @Content(array = @ArraySchema(schema = @Schema( implementation = NoteRes.class))))})
  @GetMapping("")
  public ResponseEntity<List<NoteRes>> searchNoteList(){
    List<NoteRes> noteResList = new ArrayList<>();
    List<Note> notes = noteService.searchNoteList();


    for(Note note:notes){
      noteResList.add(
              NoteRes.builder()
                      .id(note.getId())
                      .name(note.getName()).build()
      );
    }

    noteResList.add(NoteRes.builder().id((long)-1).name("기타").build());

    return ResponseEntity.ok(noteResList);
  }
}
