package com.ssg.shopping.product.controller;

import com.ssg.shopping.payment.data.Response.PaymentDetailResponse;
import com.ssg.shopping.product.service.ProductService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://k4d101.p.ssafy.io", "http://localhost:3000"})
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @ApiOperation(value = "장바구니 내 상품 추가 (이미 찍은 상품이면 개수 추가)", notes = "입력값 : memberId(사용자고유번호), prodCode(바코드번호)\n출력값 : 상품 정보")
    @GetMapping("/product_insert")
    public ResponseEntity<?> insertProduct(@RequestParam long memberId, @RequestParam String prodCode) {
        PaymentDetailResponse paymentDetailResponse = productService.getProduct(memberId, prodCode);
        System.out.println("<장바구니 내 상품 추가> 멤버고유번호 : "+memberId+", 바코드번호 : "+prodCode);
        return new ResponseEntity<>(paymentDetailResponse, HttpStatus.OK);
    }

    @ApiOperation(value = "장바구니 내 상품 개수 변경", notes = "입력값 : memberId(사용자고유번호), prodId(상품고유번호), qty(변경된 개수)\n출력값 : success")
    @PostMapping("/product_update")
    public ResponseEntity<?> updateProduct(@RequestBody Map<String, String> param) {
        long memberId = Long.parseLong(param.get("memberId"));
        long prodId = Long.parseLong(param.get("prodId"));
        long qty = Long.parseLong(param.get("qty"));
        productService.updateProduct(memberId, prodId, qty);
        System.out.println("<장바구니 내 상품 개수 변경> 멤버고유번호 : "+memberId+", 상품고유번호 : "+prodId+", 변경개수 : "+qty);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "장바구니 내 상품 삭제 (상품고유번호 배열에 담아서)", notes = "입력값 : memberId(사용자고유번호), prodIds(상품고유번호)\n출력값 : success")
    @DeleteMapping("/product_delete")
    public ResponseEntity<?> deleteProduct(@RequestParam long memberId, @RequestParam List<Long> prodIds) {
        for(long prodId : prodIds) productService.deleteProduct(memberId, prodId);
        System.out.println("<장바구니 내 상품 삭제> 멤버고유번호 : "+memberId+", 상품고유번호 : "+prodIds.toString());
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "장바구니 내 상품 전체 삭제", notes = "입력값 : memberId(사용자고유번호)\n출력값 : success")
    @DeleteMapping("/product_deleteAll")
    public ResponseEntity<?> deleteAllProduct(@RequestParam long memberId) {
        productService.deleteAllProduct(memberId);
        System.out.println("<장바구니 내 상품 전체 삭제> 멤버고유번호 : "+memberId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
