package nl.praas.cafetariasolution.api.dto.adaption;

import java.util.Optional;

public class AdaptionShortDto {

    private Optional<Integer> id;

    private String name;

    private String price;

    private AdaptionShortDto() { }

    public AdaptionShortDto(Optional<Integer> id, String name, String price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public Optional<Integer> getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }
}
