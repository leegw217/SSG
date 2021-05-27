package com.ssg.shopping.product.controller;

import com.ssg.shopping.product.service.EventService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://k4d101.p.ssafy.io", "http://localhost:3000"})
@RequestMapping("/event")
public class EventController {
    @Autowired
    private EventService eventService;

    @ApiOperation(value = "이벤트 목록 조회", notes = "입력값 : 없음\n출력값 : 이벤트 정보")
    @GetMapping("/get_events")
    public ResponseEntity<?> getEventsList() {
        System.out.println("<이벤트 : 배너>");
        return new ResponseEntity<>(eventService.getEventsList(), HttpStatus.OK);
    }

    @ApiOperation(value = "덤 증정 제품 조회", notes = "입력값 : 없음\n출력값 : 덤 증정 제품 정보")
    @GetMapping("/get_dum")
    public ResponseEntity<?> getDumProductList() {
        System.out.println("<이벤트 : 덤 증정>");
        return new ResponseEntity<>(eventService.getDumProductList(), HttpStatus.OK);
    }

    @ApiOperation(value = "+1 제품 조회", notes = "입력값 : 없음\n출력값 : +1 제품 정보")
    @GetMapping("/get_plus")
    public ResponseEntity<?> getPlusOneProductList() {
        System.out.println("<이벤트 : +1>");
        return new ResponseEntity<>(eventService.getPlusOneProductList(), HttpStatus.OK);
    }

    @ApiOperation(value = "세일 제품 조회", notes = "입력값 : 없음\n출력값 : 세일 제품 정보")
    @GetMapping("/get_sale")
    public ResponseEntity<?> getSaleProductList() {
        System.out.println("<이벤트 : 세일>");
        return new ResponseEntity<>(eventService.getSaleProductList(), HttpStatus.OK);
    }

    @ApiOperation(value = "맥주 랭킹 조회", notes = "입력값 : 없음\n출력값 : 맥주 랭킹 정보")
    @GetMapping("/get_beer")
    public ResponseEntity<?> getBeerRankingList() {
        System.out.println("<이벤트 : 맥주 랭킹>");
        return new ResponseEntity<>(eventService.getBeerRanking(), HttpStatus.OK);
    }

    @ApiOperation(value = "아이스크림 랭킹 조회", notes = "입력값 : 없음\n출력값 : 아이스크림 랭킹 정보")
    @GetMapping("/get_icecream")
    public ResponseEntity<?> getIcecreamRankingList() {
        System.out.println("<이벤트 : 아이스크림 랭킹>");
        return new ResponseEntity<>(eventService.getIcecreamRanking(), HttpStatus.OK);
    }

    @ApiOperation(value = "과자 랭킹 조회", notes = "입력값 : 없음\n출력값 : 과자 랭킹 정보")
    @GetMapping("/get_snack")
    public ResponseEntity<?> getSnackRankingList() {
        System.out.println("<이벤트 : 과자 랭킹>");
        return new ResponseEntity<>(eventService.getSnackRanking(), HttpStatus.OK);
    }
}
