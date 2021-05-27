package com.ssg.shopping.product.data.Repository;

import com.ssg.shopping.product.data.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long>{
    public Product findByProdCode(String prodCode);
}
