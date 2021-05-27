package com.ssg.shopping.product.data.Repository;

import com.ssg.shopping.product.data.Entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    public ProductImage findByProdName(String prodName);
}
