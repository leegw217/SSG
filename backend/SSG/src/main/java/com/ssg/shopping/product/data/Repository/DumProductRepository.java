package com.ssg.shopping.product.data.Repository;

import com.ssg.shopping.product.data.Entity.DumProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DumProductRepository extends JpaRepository<DumProduct, Long> {
}
