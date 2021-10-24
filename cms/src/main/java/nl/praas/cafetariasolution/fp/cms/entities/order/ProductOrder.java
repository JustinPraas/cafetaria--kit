package nl.praas.cafetariasolution.fp.cms.entities.order;

import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Optional;

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

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "PRODUCT_ORDER_ADAPTION_MAPPINGS",
            joinColumns = @JoinColumn(name = "product_order_id"),
            inverseJoinColumns = @JoinColumn(name = "adaption_id"))
    private Collection<Adaption> appliedAdaptions;

    private BigDecimal price;

    private int quantity;

    ProductOrder() { }

    public ProductOrder(Order order, Product product, Collection<Adaption> appliedAdaptions, BigDecimal price, int quantity) {
        this.order = order;
        this.product = product;
        this.appliedAdaptions = appliedAdaptions;
        this.price = price;
        this.quantity = quantity;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
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

    public Collection<Adaption> getAppliedAdaptions() {
        return appliedAdaptions;
    }

    public void setAppliedAdaptions(Collection<Adaption> appliedAdaptions) {
        this.appliedAdaptions = appliedAdaptions;
    }
}
