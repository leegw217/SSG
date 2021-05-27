package com.ssg.shopping.product.service;

import com.ssg.member.data.Member;
import com.ssg.member.data.MemberRepository;
import com.ssg.shopping.payment.data.Entity.CurrentPayment;
import com.ssg.shopping.payment.data.Entity.CustomerPayment;
import com.ssg.shopping.payment.data.Entity.PaymentDetail;
import com.ssg.shopping.payment.data.Repository.CurrentPaymentRepository;
import com.ssg.shopping.payment.data.Repository.CustomerPaymentRepository;
import com.ssg.shopping.payment.data.Repository.PaymentDetailRepository;
import com.ssg.shopping.payment.data.Response.PaymentDetailResponse;
import com.ssg.shopping.product.data.Repository.ProductImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssg.shopping.product.data.Entity.Product;
import com.ssg.shopping.product.data.Repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CustomerPaymentRepository customerPaymentRepository;
    private final PaymentDetailRepository paymentDetailRepository;
    private final CurrentPaymentRepository currentPaymentRepository;
    private final MemberRepository memberRepository;
    private final ProductImageRepository productImageRepository;

    // 바코드 찍어서 장바구니 내 상품 추가
    @Transactional
    public PaymentDetailResponse getProduct(long memberId, String prodCode) {
        // 현재 사용중인 장바구니가 있는지 확인
        CurrentPayment currentPayment = currentPaymentRepository.findByMemberId(memberId);
        CustomerPayment customerPayment = null;
        // 없으면 장바구니 만들기
        if(currentPayment == null) {
            if(memberRepository.findById(memberId).isPresent()) {
                Member member = memberRepository.findById(memberId).get();
                customerPayment = customerPaymentRepository.save(new CustomerPayment("지점1", member));
                currentPaymentRepository.save(new CurrentPayment(member, customerPayment));
            }
        } else { // 있으면 장바구니 정보 조회
            if(customerPaymentRepository.findById(currentPayment.getCustomerPayment().getId()).isPresent())
                customerPayment = customerPaymentRepository.findById(currentPayment.getCustomerPayment().getId()).get();
        }
        Product product = productRepository.findByProdCode(prodCode);
        // 장바구니에 이미 있는 상품인지 검사
        PaymentDetail paymentDetail = paymentDetailRepository.findByCustomerPayment_IdAndAndProduct_Id(customerPayment.getId(), product.getId());
        // 없으면 장바구니에 추가
        if(paymentDetail == null) paymentDetail = paymentDetailRepository.save(new PaymentDetail(product, customerPayment));
        // 있으면 개수 1 추가
        else paymentDetail.update(paymentDetail.getQty()+1);

        return new PaymentDetailResponse(paymentDetail);
    }

    // 장바구니 내 상품 개수 변경
    @Transactional
    public void updateProduct(long memberId, long prodId, long qty) {
        // 현재 사용중인 장바구니 조회
        CurrentPayment currentPayment = currentPaymentRepository.findByMemberId(memberId);
        // 장바구니가 있을 때만 개수 변경 가능
        if(currentPayment != null) {
            PaymentDetail paymentDetail = paymentDetailRepository.findByCustomerPayment_IdAndAndProduct_Id(currentPayment.getCustomerPayment().getId(), prodId);
            // 해당 상품이 장바구니 안에 있을 때만 개수 변경 가능
            if(paymentDetail != null) paymentDetail.update(qty);
        }
    }

    // 장바구니 내 상품 삭제
    @Transactional
    public void deleteProduct(long memberId, long prodId) {
        // 현재 사용중인 장바구니 조회
        CurrentPayment currentPayment = currentPaymentRepository.findByMemberId(memberId);
        // 장바구니가 있을 때만 삭제 가능
        if(currentPayment != null) {
            PaymentDetail paymentDetail = paymentDetailRepository.findByCustomerPayment_IdAndAndProduct_Id(currentPayment.getCustomerPayment().getId(), prodId);
            // 해당 상품이 장바구니 안에 있을 때만 삭제 가능
            if(paymentDetail != null) paymentDetailRepository.delete(paymentDetail);
        }
    }

    // 장바구니 내 상품 전체 삭제
    @Transactional
    public void deleteAllProduct(long memberId) {
        // 현재 사용중인 장바구니 조회
        CurrentPayment currentPayment = currentPaymentRepository.findByMemberId(memberId);
        // 장바구니가 있을 때만 삭제 가능
        if(currentPayment != null) {
            List<PaymentDetail> paymentDetails = paymentDetailRepository.findByCustomerPayment_Id(currentPayment.getCustomerPayment().getId());
            // 해당 상품들이 장바구니 안에 있을 때만 삭제 가능
            if(paymentDetails != null)
                for(PaymentDetail pd : paymentDetails) paymentDetailRepository.delete(pd);
        }
    }
}