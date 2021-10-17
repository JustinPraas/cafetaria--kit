package nl.praas.cafetariasolution.api.dto.product;

import java.time.Instant;

public class ProductShortDto {

    private int id;

    private String name;

    private int categoryId;

    private PriceType priceType;

    private String price;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean active;

    private boolean archived;

    ProductShortDto() { }

    public ProductShortDto(int id, String name, int categoryId, PriceType priceType, String price, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.priceType = priceType;
        this.price = price;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.active = active;
        this.archived = archived;
    }

    public int getId() {
        return id;
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

    public Instant getCreatedOn() {
        return createdOn;
    }

    public Instant getModifiedOn() {
        return modifiedOn;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isArchived() {
        return archived;
    }

    public PriceType getPriceType() {
        return priceType;
    }
}
