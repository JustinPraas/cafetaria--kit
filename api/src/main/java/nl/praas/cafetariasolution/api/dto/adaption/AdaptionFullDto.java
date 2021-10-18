package nl.praas.cafetariasolution.api.dto.adaption;

import java.time.Instant;

public class AdaptionFullDto {

    private Integer id;

    private String name;

    private String price;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean registered;

    private boolean archived;

    public AdaptionFullDto() { }

    public AdaptionFullDto(Integer id, String name, String price, Instant createdOn, Instant modifiedOn, boolean registered, boolean archived) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.registered = registered;
        this.archived = archived;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
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

    public boolean isRegistered() {
        return registered;
    }

    public boolean isArchived() {
        return archived;
    }
}
