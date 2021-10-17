package nl.praas.cafetariasolution.api.dto.category;

import java.time.Instant;

public class CategoryShortDto {

    private int id;

    private String name;

    private String colorHex;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean active;

    private boolean archived;

    CategoryShortDto() { }

    public CategoryShortDto(int id, String name, String colorHex, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        this.id = id;
        this.name = name;
        this.colorHex = colorHex;
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
}
