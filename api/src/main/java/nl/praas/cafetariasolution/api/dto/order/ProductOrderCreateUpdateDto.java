package nl.praas.cafetariasolution.api.dto.order;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;

import java.util.List;
import java.util.Optional;

public class ProductOrderCreateUpdateDto {

    private Optional<Integer> id;

    private int productId;

    private String price;

    private List<AdaptionShortDto> appliedAdaptionShortDtos;

    private int quantity;

    public ProductOrderCreateUpdateDto() {
    }

    public Optional<Integer> getId() {
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
