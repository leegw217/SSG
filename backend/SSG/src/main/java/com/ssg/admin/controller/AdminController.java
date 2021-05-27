package com.ssg.admin.controller;

import com.ssg.admin.service.AdminService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://k4d101.p.ssafy.io", "http://localhost:3000"})
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @ApiOperation(value = "사용자 목록 조회(10개씩)", notes = "입력값 : pageNum(페이지번호:0번부터시작)\n출력값 : 사용자 정보")
    @GetMapping("/members")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getMembers(@RequestParam long pageNum) {
        System.out.println("<관리자 : 사용자 목록 조회> 페이지번호 : "+pageNum);
        return new ResponseEntity<>(adminService.getMemberList(pageNum), HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 결제내역 전체 조회(10개씩)", notes = "입력값 : loginId(로그인아이디), pageNum(페이지번호:0번부터시작)\n출력값 : 결제 내역 정보")
    @GetMapping("/payments_all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllPayments(@RequestParam String loginId, @RequestParam long pageNum) {
        System.out.println("<관리자 : 사용자 결제내역 전체 조회(10개씩)> 로그인아이디 : "+loginId);
        return new ResponseEntity<>(adminService.getMemberCustomerPaymentListAll(loginId, pageNum), HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 결제내역 날짜별 조회(10개씩)", notes = "입력값 : loginId(로그인아이디), date1(날짜1), date2(날짜2), pageNum(페이지번호:0번부터시작)\n출력값 : 결제 내역 정보")
    @GetMapping("/payments_date")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDatePayments(@RequestParam String loginId, @RequestParam String date1, @RequestParam String date2, @RequestParam long pageNum) throws ParseException {
        System.out.println("<관리자 : 사용자 결제내역 날짜별 조회(10개씩)> 로그인아이디 : "+loginId+", 날짜1 : "+date1+", 날짜2 : "+date2);
        return new ResponseEntity<>(adminService.getMemberCustomerPaymentListDate(loginId, date1, date2, pageNum), HttpStatus.OK);
    }

    @ApiOperation(value = "특정 날짜 결제내역 조회(10개씩)", notes = "입력값 : date(날짜), pageNum(페이지번호:0번부터시작)\n출력값 : 결제 내역 정보")
    @GetMapping("/payments_one_date")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getOneDatePayments(@RequestParam String date, @RequestParam long pageNum) throws ParseException {
        System.out.println("<관리자 : 특정 날짜 결제내역 조회(10개씩)> 날짜 : "+date);
        return new ResponseEntity<>(adminService.getCustomerPaymentByDate(1, date, pageNum), HttpStatus.OK);
    }

    @ApiOperation(value = "특정 날짜 결제내역 조회(전체)", notes = "입력값 : date(날짜)\n출력값 : 결제 내역 정보")
    @GetMapping("/payments_one_date_all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getOneDateAllPayments(@RequestParam String date) throws ParseException {
        System.out.println("<관리자 : 특정 날짜 결제내역 조회(전체)> 날짜 : "+date);
        return new ResponseEntity<>(adminService.getCustomerPaymentByDate(2, date, 0), HttpStatus.OK);
    }
}
