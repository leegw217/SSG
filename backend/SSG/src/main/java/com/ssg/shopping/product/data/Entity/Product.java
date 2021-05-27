package com.ssg.shopping.product.data.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssg.shopping.payment.data.Entity.PaymentDetail;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String prodCode;
    private String prodName;
    private String prodPrice;

    @JsonIgnore
    @OneToOne(mappedBy = "product")
    private ProductImage productImage;
}
