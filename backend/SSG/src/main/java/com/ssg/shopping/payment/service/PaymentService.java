package com.ssg.shopping.payment.service;

import com.ssg.member.data.Member;
import com.ssg.member.data.MemberRepository;
import com.ssg.shopping.payment.data.Entity.CurrentPayment;
import com.ssg.shopping.payment.data.Entity.CustomerPayment;
import com.ssg.shopping.payment.data.Repository.CurrentPaymentRepository;
import com.ssg.shopping.payment.data.Repository.CustomerPaymentRepository;
import com.ssg.shopping.payment.data.Repository.PaymentDetailRepository;
import com.ssg.shopping.payment.data.Response.CustomerPaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final CustomerPaymentRepository customerPaymentRepository;
    private final PaymentDetailRepository paymentDetailRepository;
    private final CurrentPaymentRepository currentPaymentRepository;
    private final MemberRepository memberRepository;
    @Value("${hmac.secret}") String secret;
    
    // 장바구니 조회
    @Transactional
    public CustomerPaymentResponse getCustomerPayment(long memberId) {
        CurrentPayment currentPayment = currentPaymentRepository.findByMemberId(memberId);
        CustomerPayment customerPayment = null;
        // 현재 작성중인 장바구니가 없음
        if(currentPayment == null) {
            if(memberRepository.findById(memberId).isPresent()) {
                Member member = memberRepository.findById(memberId).get();
                customerPayment = customerPaymentRepository.save(new CustomerPayment("지점1", member));
                currentPaymentRepository.save(new CurrentPayment(member, customerPayment));
            }
        } else { // 있음
            if(customerPaymentRepository.findById(currentPayment.getCustomerPayment().getId()).isPresent()) {
                customerPayment = customerPaymentRepository.findById(currentPayment.getCustomerPayment().getId()).get();
                customerPayment.update();
            }
        }
        return new CustomerPaymentResponse(customerPayment);
    }

    // 거래내역 조회
    @Transactional
    public List<CustomerPaymentResponse> getCustomerPaymentList(long memberId, String date1, String date2, long pageNum) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date txDate1 = df.parse(date1);
        Calendar cal = Calendar.getInstance();
        Date txDate2 = df.parse(date2);
        cal.setTime(txDate2);
        cal.add(Calendar.DATE, 1);
        txDate2 = cal.getTime();
        List<CustomerPayment> paymentList = customerPaymentRepository.findByMember_IdAndTxDateTimeGreaterThanAndTxDateTimeLessThan(memberId, txDate1, txDate2, PageRequest.of((int)pageNum, 10, Direction.DESC, "txDateTime"));
        List<CustomerPaymentResponse> customerPaymentList = new ArrayList<>();
        for(CustomerPayment payment : paymentList) {
            if(payment.getPaymentResult().equals("")) continue;
            customerPaymentList.add(new CustomerPaymentResponse(payment));
        }
        return customerPaymentList;
    }

    // HMAC 체크
    @Transactional
    public boolean checkAuthHash(Map<String, Object> payment) {
        String txSeq = (String)payment.get("txSeq");
        String txDateTime = (String)payment.get("txDateTime");
        String storeId = (String)payment.get("storeId");
        String clientNo = (String)payment.get("clientNo");
        String client_hash = (String)payment.get("authHash");
        StringBuilder sb = new StringBuilder();
        sb.append(txSeq);
        sb.append(txDateTime);
        sb.append(storeId);
        sb.append(clientNo);

        String SIGNATURE_ALGORITHM = "HmacSHA256";
        byte[] key = secret.getBytes();
        SecretKeySpec secretKey = new SecretKeySpec(key, SIGNATURE_ALGORITHM);
        try {
            Mac mac = Mac.getInstance(SIGNATURE_ALGORITHM);
            mac.init(secretKey);
            String server_hash = Base64.encodeBase64String(mac.doFinal(sb.toString().getBytes()));
            if(client_hash.equals(server_hash)) return true;
        } catch(Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 결제하기
    @Transactional
    public void doPay(Map<String, Object> payment) throws ParseException {
        long paymentId = Long.parseLong((String) payment.get("txSeq"));
        CustomerPayment customerPayment = customerPaymentRepository.findById(paymentId).get();
        String authHash = (String) payment.get("authHash");
        String date = (String) payment.get("txDateTime");
        StringBuilder sb = new StringBuilder(date);
        sb.insert(4, '-');
        sb.insert(7, '-');
        sb.insert(10, ' ');
        sb.insert(13, ':');
        sb.insert(16, ':');
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date txDateTime = df.parse(sb.toString());
        customerPayment.update();
        customerPayment.updatePay(txDateTime, authHash);
    }

    // 결제결과 저장
    @Transactional
    public void getPayResult(Map<String, String> result) {
        long paymentId = Long.parseLong(result.get("paymentId"));
        currentPaymentRepository.delete(currentPaymentRepository.findByCustomerPayment_Id(paymentId));
        CustomerPayment customerPayment = customerPaymentRepository.findById(paymentId).get();
        customerPayment.updateResult(result.get("paymentPlan"), result.get("paymentResult"));
    }
}
