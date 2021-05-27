package com.ssg.shopping.product.data.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "plus_one_product")
public class PlusOneProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long type;
    private String prodName;
    private String prodPrice;
    private boolean crossAble;
    private String image;
}
