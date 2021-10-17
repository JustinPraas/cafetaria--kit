package nl.praas.cafetariasolution.api.dto.order;

import java.time.Instant;
import java.util.Collection;

public class OrderFullDto {

    private int id;

    private String customerName;

    private Collection<ProductOrderShortDto> productOrderShortDtos;

    private Instant createdOn;

    private Instant modifiedOn;

    private Instant paidOn;

    private PaymentType paymentType;

    private OrderFullDto() { }

    public OrderFullDto(int id, String customerName, Collection<ProductOrderShortDto> productOrderShortDtos, Instant createdOn, Instant modifiedOn, Instant paidOn, PaymentType paymentType) {
        this.id = id;
        this.customerName = customerName;
        this.productOrderShortDtos = productOrderShortDtos;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.paidOn = paidOn;
        this.paymentType = paymentType;
    }

    public int getId() {
        return id;
    }

    public Collection<ProductOrderShortDto> getProductOrderShortDtos() {
        return productOrderShortDtos;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public Instant getModifiedOn() {
        return modifiedOn;
    }

    public Instant getPaidOn() {
        return paidOn;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public String getCustomerName() {
        return customerName;
    }
}
