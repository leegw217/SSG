package com.ssg.shopping.payment.data.Entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssg.shopping.product.data.Entity.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "payment_detail")
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long qty;

    @ManyToOne
    @JoinColumn(name = "prod_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private CustomerPayment customerPayment;

    public PaymentDetail(Product product, CustomerPayment customerPayment) {
        this.product = product;
        this.customerPayment = customerPayment;
        this.qty = 1;
    }

    public void update(long qty) {
        this.qty = qty;
    }
}
