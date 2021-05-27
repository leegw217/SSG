package com.ssg.shopping.payment.data.Repository;

import com.ssg.shopping.payment.data.Entity.CustomerPayment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CustomerPaymentRepository extends JpaRepository<CustomerPayment, Long> {
    public List<CustomerPayment> findByMember_IdAndTxDateTimeGreaterThanAndTxDateTimeLessThan(long memberId, Date date1, Date date2, Pageable page);
    public List<CustomerPayment> findByMemberLoginId(String loginId, Pageable page);
    public List<CustomerPayment> findByMemberLoginIdAndTxDateTimeGreaterThanAndTxDateTimeLessThan(String loginId, Date date1, Date date2, Pageable page);
    public List<CustomerPayment> findByTxDateTimeGreaterThanAndTxDateTimeLessThan(Date date1, Date date2, Pageable page);
    public List<CustomerPayment> findByTxDateTimeGreaterThanAndTxDateTimeLessThan(Date date1, Date date2);
}
