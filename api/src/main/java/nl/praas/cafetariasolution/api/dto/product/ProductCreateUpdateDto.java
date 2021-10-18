package nl.praas.cafetariasolution.api.dto.product;

import java.util.List;

public class ProductCreateUpdateDto {

    private String name;

    private int categoryId;

    private PriceType priceType;

    private List<Integer> possibleAdaptionIds;

    private String price;

    private boolean active;

    ProductCreateUpdateDto() { }

    public String getName() {
        return name;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getPrice() {
        return price;
    }

    public boolean isActive() {
        return active;
    }

    public PriceType getPriceType() {
        return priceType;
    }

    public List<Integer> getPossibleAdaptionIds() {
        return possibleAdaptionIds;
    }
}
