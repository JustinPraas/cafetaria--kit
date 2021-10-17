package nl.praas.cafetariasolution.api.dto.product;

public class ProductCreateUpdateDto {

    private String name;

    private int categoryId;

    private PriceType priceType;

    private String price;

    private boolean active;

    ProductCreateUpdateDto() { }

    public ProductCreateUpdateDto(String name, int categoryId, PriceType priceType, String price, boolean active) {
        this.name = name;
        this.categoryId = categoryId;
        this.priceType = priceType;
        this.price = price;
        this.active = active;
    }

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
}
