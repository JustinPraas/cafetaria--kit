package nl.praas.cafetariasolution.api.dto.order;

public class ProductOrderShortDto {

    private int id;

    private int orderId;

    private int productId;

    private String price;

    private int quantity;

    private String adjustment;

    private ProductOrderShortDto() {}

    public ProductOrderShortDto(int id, int orderId, int productId, String price, int quantity, String adjustment) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.adjustment = adjustment;
    }

    public int getId() {
        return id;
    }

    public int getOrderId() {
        return orderId;
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
}
