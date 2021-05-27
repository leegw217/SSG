package com.ssg.shopping.payment.data.Repository;

import com.ssg.shopping.payment.data.Entity.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Long> {
    public PaymentDetail findByCustomerPayment_IdAndAndProduct_Id(long payment_id, long prod_id);
    public List<PaymentDetail> findByCustomerPayment_Id(long payment_id);
}
