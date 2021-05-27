package com.ssg.shopping.payment.data.Entity;

import com.ssg.member.data.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "current_payment")
public class CurrentPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private CustomerPayment customerPayment;

    public CurrentPayment(Member member, CustomerPayment customerPayment) {
        this.member = member;
        this.customerPayment = customerPayment;
    }
}
