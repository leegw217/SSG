package com.ssg.shopping.product.data.Repository;

import com.ssg.shopping.product.data.Entity.PlusOneProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlusOneProductRepository extends JpaRepository<PlusOneProduct, Long> {

}
