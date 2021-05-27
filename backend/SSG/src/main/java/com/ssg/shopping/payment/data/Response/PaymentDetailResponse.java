package com.ssg.shopping.payment.data.Response;

import com.ssg.shopping.payment.data.Entity.PaymentDetail;
import com.ssg.shopping.product.data.Repository.ProductImageRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PaymentDetailResponse {
    private long prodId;
    private String prodCode;
    private String prodName;
    private String prodPrice;
    private String prodImage;
    private long qty;

    public PaymentDetailResponse(PaymentDetail paymentDetail) {
        this.prodId = paymentDetail.getProduct().getId();
        this.prodCode = paymentDetail.getProduct().getProdCode();
        this.prodName = paymentDetail.getProduct().getProdName();
        this.prodPrice = paymentDetail.getProduct().getProdPrice();
        this.prodImage = paymentDetail.getProduct().getProductImage().getImage();
        this.qty = paymentDetail.getQty();
    }

//    public void updateProductImage(String prodImage) {
//        this.prodImage = prodImage;
//    }
}
