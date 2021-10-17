package nl.praas.cafetariasolution.api.dto.category;

import nl.praas.cafetariasolution.api.dto.product.ProductShortDto;

import java.time.Instant;
import java.util.List;

public class CategoryFullDto extends CategoryShortDto {

    private List<ProductShortDto> productShortDtos;

    CategoryFullDto() { super(); }

    public CategoryFullDto(int id, String name, String colorHex, List<ProductShortDto> productShortDtos, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        super(id, name, colorHex, createdOn, modifiedOn, active, archived);
        this.productShortDtos = productShortDtos;
    }

    public List<ProductShortDto> getProductShortDtos() {
        return productShortDtos;
    }
}
