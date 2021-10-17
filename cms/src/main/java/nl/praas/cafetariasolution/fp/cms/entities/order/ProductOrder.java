package nl.praas.cafetariasolution.fp.cms.entities.order;

import nl.praas.cafetariasolution.fp.cms.entities.product.Product;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "PRODUCT_ORDER")
public class ProductOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private BigDecimal price;

    private int quantity;

    private String adjustment;

    private ProductOrder() { }

    public ProductOrder(Order order, Product product, BigDecimal price, int quantity, String adjustment) {
        this.order = order;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.adjustment = adjustment;
    }

    public int getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getAdjustment() {
        return adjustment;
    }

    public void setAdjustment(String adjustment) {
        this.adjustment = adjustment;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductOrder that = (ProductOrder) o;
        return id == that.id && Objects.equals(order, that.order) && Objects.equals(product, that.product) && Objects.equals(adjustment, that.adjustment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, order, product, adjustment);
    }

    @Override
    public String toString() {
        return "ProductOrder{" +
                "id=" + id +
                ", order=" + order +
                ", product=" + product +
                ", adjustment='" + adjustment + '\'' +
                '}';
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setId(int id) {
        this.id = id;
    }
}
