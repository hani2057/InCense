package com.suyang.incense.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "사용자 API", tags = {"Member"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/member")
public class MemberController {


}
