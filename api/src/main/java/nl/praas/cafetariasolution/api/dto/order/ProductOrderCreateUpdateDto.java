package nl.praas.cafetariasolution.api.dto.order;

public class ProductOrderCreateUpdateDto {

    private Integer id;

    private int productId;

    private String price;

    private int quantity;

    private String adjustment;

    public ProductOrderCreateUpdateDto() {
    }

    public ProductOrderCreateUpdateDto(Integer id, int productId, String price, int quantity, String adjustment) {
        this.id = id;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.adjustment = adjustment;
    }

    public int getProductId() {
        return productId;
    }

    public String getAdjustment() {
        return adjustment;
    }

    public String getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public Integer getId() {
        return id;
    }
}
