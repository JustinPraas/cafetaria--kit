package nl.praas.cafetariasolution.api.dto.adaption;

import nl.praas.cafetariasolution.api.dto.product.ProductShortDto;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public class AdaptionFullDto extends AdaptionShortDto {

    private List<ProductShortDto> linkedProductShortDtos;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean registered;

    private boolean archived;

    public AdaptionFullDto() { super(); }

    public AdaptionFullDto(Integer id, String name, String price, List<ProductShortDto> linkedProductShortDtos, Instant createdOn, Instant modifiedOn, boolean registered, boolean archived) {
        super(Optional.of(id), name, price);
        this.linkedProductShortDtos = linkedProductShortDtos;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.registered = registered;
        this.archived = archived;
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

    public List<ProductShortDto> getLinkedProductShortDtos() {
        return linkedProductShortDtos;
    }

    public void setLinkedProductShortDtos(List<ProductShortDto> linkedProductShortDtos) {
        this.linkedProductShortDtos = linkedProductShortDtos;
    }
}
