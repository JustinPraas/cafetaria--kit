package nl.praas.cafetariasolution.api.dto.product;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public class ProductFullDto extends ProductShortDto {

    private List<AdaptionShortDto> possibleAdaptionShortDtos;

    private ProductFullDto() { }

    public ProductFullDto(int id, String name, int categoryId, PriceType priceType, String price, List<AdaptionShortDto> possibleAdaptionShortDtos, Optional<Integer> sequenceOrder, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        super(id, name, categoryId, priceType, price, sequenceOrder, createdOn, modifiedOn, active, archived);
        this.possibleAdaptionShortDtos = possibleAdaptionShortDtos;
    }

    public List<AdaptionShortDto> getPossibleAdaptionShortDtos() {
        return possibleAdaptionShortDtos;
    }
}
