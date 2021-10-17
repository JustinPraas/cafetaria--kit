package nl.praas.cafetariasolution.api.dto.category;

public class CategoryCreateUpdateDto {

    private String name;
    private boolean active;
    private String colorHex;

    CategoryCreateUpdateDto() {}

    public CategoryCreateUpdateDto(String name, boolean active, String colorHex) {
        this.name = name;
        this.active = active;
        this.colorHex = colorHex;
    }

    public String getName() {
        return name;
    }

    public boolean isActive() {
        return active;
    }

    public String getColorHex() {
        return colorHex;
    }
}
