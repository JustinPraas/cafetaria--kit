package nl.praas.cafetariasolution.api.dto.product;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;

import java.time.Instant;
import java.util.List;

public class ProductShortDto {

    private int id;

    private String name;

    private int categoryId;

    private PriceType priceType;

    private String price;

    private List<AdaptionShortDto> possibleAdaptionShortDtos;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean active;

    private boolean archived;

    ProductShortDto() { }

    public ProductShortDto(int id, String name, int categoryId, PriceType priceType, String price, List<AdaptionShortDto> possibleAdaptionShortDtos, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.priceType = priceType;
        this.price = price;
        this.possibleAdaptionShortDtos = possibleAdaptionShortDtos;
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

    public List<AdaptionShortDto> getPossibleAdaptionShortDtos() {
        return possibleAdaptionShortDtos;
    }
}
