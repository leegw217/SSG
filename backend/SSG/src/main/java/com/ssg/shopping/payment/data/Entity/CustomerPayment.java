package com.ssg.shopping.payment.data.Entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssg.member.data.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "customer_payment")
public class CustomerPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String storeId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date txDateTime;
    private String authHash;
    private long paymentCount;
    private long paymentAmount;
    private String paymentPlan;
    private String paymentResult;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "customerPayment")
    private List<PaymentDetail> paymentDetail = new ArrayList<>();

    public CustomerPayment(String storeId, Member member) {
        this.storeId = storeId;
        this.member = member;
    }

    public void update() {
        long count = 0;
        long amount = 0;
        for(PaymentDetail pd : paymentDetail) {
            count += pd.getQty();
            amount += Long.parseLong(pd.getProduct().getProdPrice())*pd.getQty();
        }
        this.paymentCount = count;
        this.paymentAmount = amount;
    }

    public void updatePay(Date txDateTime, String authHash) {
        this.txDateTime = txDateTime;
        this.authHash = authHash;
    }

    public void updateResult(String paymentPlan, String paymentResult) {
        this.paymentPlan = paymentPlan;
        this.paymentResult = paymentResult;
    }
}
