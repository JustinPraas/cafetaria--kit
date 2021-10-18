package nl.praas.cafetariasolution.api.dto.order;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;

import java.util.List;

public class ProductOrderShortDto {

    private int id;

    private int orderId;

    private int productId;

    private String price;

    private List<AdaptionShortDto> appliedAdaptionShortDtos;

    private int quantity;

    private ProductOrderShortDto() {}

    public ProductOrderShortDto(int id, int orderId, int productId, String price, List<AdaptionShortDto> appliedAdaptionShortDtos, int quantity) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.price = price;
        this.appliedAdaptionShortDtos = appliedAdaptionShortDtos;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public int getOrderId() {
        return orderId;
    }

    public int getProductId() {
        return productId;
    }

    public String getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public List<AdaptionShortDto> getAppliedAdaptionShortDtos() {
        return appliedAdaptionShortDtos;
    }
}
