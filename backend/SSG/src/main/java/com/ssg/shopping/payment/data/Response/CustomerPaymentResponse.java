package com.ssg.shopping.payment.data.Response;

import com.ssg.shopping.payment.data.Entity.CustomerPayment;
import com.ssg.shopping.payment.data.Entity.PaymentDetail;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
public class CustomerPaymentResponse {
    private long id;
    private String storeId;
    private Date txDateTime;
    private String authHash;
    private long paymentCount;
    private long paymentAmount;
    private String paymentPlan;
    private String paymentResult;
    private List<PaymentDetailResponse> paymentDetail = new ArrayList<PaymentDetailResponse>();

    public CustomerPaymentResponse(CustomerPayment customerPayment) {
        this.id = customerPayment.getId();
        this.storeId = customerPayment.getStoreId();
        this.txDateTime = customerPayment.getTxDateTime();
        this.authHash = customerPayment.getAuthHash();
        this.paymentCount = customerPayment.getPaymentCount();
        this.paymentAmount = customerPayment.getPaymentAmount();
        this.paymentPlan = customerPayment.getPaymentPlan();
        this.paymentResult = customerPayment.getPaymentResult();
        for(PaymentDetail pd : customerPayment.getPaymentDetail())
            paymentDetail.add(new PaymentDetailResponse(pd));
    }
}
