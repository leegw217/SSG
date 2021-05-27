package com.ssg.shopping.payment.controller;

import com.ssg.shopping.payment.data.Response.CustomerPaymentResponse;
import com.ssg.shopping.payment.service.PaymentService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://k4d101.p.ssafy.io", "http://localhost:3000"})
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @ApiOperation(value = "장바구니 조회 (없으면 새로만들고 있으면 불러오기)", notes = "입력값 : memberId(사용자고유번호)\n출력값 : 장바구니 정보")
    @GetMapping("/get_customer_payment")
    public ResponseEntity<?> getCustomerPayment(@RequestParam long memberId) {
        CustomerPaymentResponse customerPayment = paymentService.getCustomerPayment(memberId);
        System.out.println("<장바구니> 멤버고유번호 : "+memberId+", 장바구니번호 : "+customerPayment.getId());
        return new ResponseEntity<>(customerPayment, HttpStatus.OK);
    }

    @ApiOperation(value = "거래내역 조회 (날짜 2개, 10개씩)", notes = "입력값 : memberId(사용자고유번호), month(몇개월), pageNum(페이지번호:0번부터)\n출력값 : 거래내역")
    @GetMapping("/list_customer_payment")
    public ResponseEntity<?> getCustomerPaymentList(@RequestParam long memberId, @RequestParam String date1, @RequestParam String date2, @RequestParam long pageNum) throws ParseException {
        List<CustomerPaymentResponse> customerPaymentList = paymentService.getCustomerPaymentList(memberId, date1, date2, pageNum);
        System.out.println("<거래내역> 멤버고유번호 : "+memberId+", 날짜1 : "+date1+", 날짜2 : "+date2+", 페이지번호 : "+pageNum+", 총 개수 : "+customerPaymentList.size());
        return new ResponseEntity<>(customerPaymentList, HttpStatus.OK);
    }

    @ApiOperation(value = "결제하기 (기업api 명세참고)", notes = "입력값 : payment(장바구니:api명세 참고)\n출력값 : resultCode(결제코드), resultMsg(결제메세지)")
    @PostMapping("/pay")
    public ResponseEntity<?> doPay(@RequestBody Map<String, Object> payment) throws ParseException {
        if(!paymentService.checkAuthHash(payment))
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        paymentService.doPay(payment);
        Map<String, String> result = new HashMap<>();
        result.put("resultCode", "000");
        result.put("resultMsg", "구매정보 확인 성공");
        System.out.println("<결제> 멤버고유번호 : "+payment.get("clientNo")+", 결제번호 : "+payment.get("txSeq"));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "결제결과 전송", notes = "입력값 : paymentId(결제고유번호), paymentPlan(결제방법:현금/카드), paymentResult(결제결과:성공/실패)\n출력값 : success")
    @PostMapping("/pay_result")
    public ResponseEntity<?> getPayResult(@RequestBody Map<String, String> result) {
        paymentService.getPayResult(result);
        System.out.println("<결제결과> 결제고유번호 : "+result.get("paymentId")+", 결제방법 : "+result.get("paymentPlan")+", 결제결과 : "+result.get("paymentResult"));
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
