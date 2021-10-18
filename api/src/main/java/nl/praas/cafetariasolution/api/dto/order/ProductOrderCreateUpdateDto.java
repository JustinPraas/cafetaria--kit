package nl.praas.cafetariasolution.api.dto.order;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;

import java.util.List;

public class ProductOrderCreateUpdateDto {

    private Integer id;

    private int productId;

    private String price;

    private List<AdaptionShortDto> appliedAdaptionShortDtos;

    private int quantity;

    public ProductOrderCreateUpdateDto() {
    }

    public Integer getId() {
        return id;
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
