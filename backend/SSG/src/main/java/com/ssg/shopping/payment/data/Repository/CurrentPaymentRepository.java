package com.ssg.shopping.payment.data.Repository;

import com.ssg.shopping.payment.data.Entity.CurrentPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrentPaymentRepository extends JpaRepository<CurrentPayment, Long> {
    public CurrentPayment findByMemberId(long memberId);
    public CurrentPayment findByCustomerPayment_Id(long payment_id);
}
