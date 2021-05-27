package com.ssg.shopping.product.data.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "product_image")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String prodName;
    private String image;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "prod_num")
    private Product product;
}
