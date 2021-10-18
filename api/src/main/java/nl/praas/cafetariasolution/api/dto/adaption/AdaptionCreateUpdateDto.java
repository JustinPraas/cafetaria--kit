package nl.praas.cafetariasolution.api.dto.adaption;

public class AdaptionCreateUpdateDto {
    private String name;

    private String price;

    private AdaptionCreateUpdateDto() {}

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }
}
