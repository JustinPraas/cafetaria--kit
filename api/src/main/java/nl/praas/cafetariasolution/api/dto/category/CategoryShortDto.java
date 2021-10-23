package nl.praas.cafetariasolution.api.dto.category;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public class CategoryShortDto {

    private int id;

    private String name;

    private String colorHex;

    private Optional<Integer> sequenceOrder;

    private List<Integer> productIds;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean active;

    private boolean archived;

    CategoryShortDto() { }

    public CategoryShortDto(int id, String name, String colorHex, Optional<Integer> sequenceOrder, List<Integer> productIds, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        this.id = id;
        this.name = name;
        this.colorHex = colorHex;
        this.sequenceOrder = sequenceOrder;
        this.productIds = productIds;
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

    public String getColorHex() {
        return colorHex;
    }

    public Optional<Integer> getSequenceOrder() {
        return sequenceOrder;
    }

    public List<Integer> getProductIds() {
        return productIds;
    }
}
