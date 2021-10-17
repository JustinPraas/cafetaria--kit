package nl.praas.cafetariasolution.api.dto.order;

import java.util.Collection;

public class OrderCreateUpdateDto {

    private String customerName;

    private Collection<ProductOrderCreateUpdateDto> productOrderCreateUpdateDtos;

    private PaymentType paymentType;

    private OrderCreateUpdateDto() { }

    public OrderCreateUpdateDto(String customerName, Collection<ProductOrderCreateUpdateDto> productOrderCreateUpdateDtos, PaymentType paymentType) {
        this.customerName = customerName;
        this.productOrderCreateUpdateDtos = productOrderCreateUpdateDtos;
        this.paymentType = paymentType;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Collection<ProductOrderCreateUpdateDto> getProductOrderCreateUpdateDtos() {
        return productOrderCreateUpdateDtos;
    }
}
