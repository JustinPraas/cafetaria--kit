package nl.praas.cafetariasolution.api.dto.category;

import nl.praas.cafetariasolution.api.dto.product.ProductShortDto;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CategoryFullDto extends CategoryShortDto {

    private List<ProductShortDto> productShortDtos;

    CategoryFullDto() { super(); }

    public CategoryFullDto(int id, String name, String colorHex, Optional<Integer> sequenceOrder, List<ProductShortDto> productShortDtos, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        super(id, name, colorHex, sequenceOrder, productShortDtos.stream().map(p -> p.getId()).collect(Collectors.toList()), createdOn, modifiedOn, active, archived);
        this.productShortDtos = productShortDtos;
    }

    public List<ProductShortDto> getProductShortDtos() {
        return productShortDtos;
    }
}
