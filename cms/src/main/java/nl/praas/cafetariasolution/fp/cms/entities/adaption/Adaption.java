package nl.praas.cafetariasolution.fp.cms.entities.adaption;

import nl.praas.cafetariasolution.fp.cms.entities.product.Product;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "ADAPTIONS")
public class Adaption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private BigDecimal price;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "PRODUCTS_ADAPTION_MAPPINGS",
            joinColumns = @JoinColumn(name = "adaption_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Collection<Product> productsWithAdaption;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean registered;

    private boolean archived;

    Adaption() { }

    public Adaption(String name, BigDecimal price, Instant createdOn, Instant modifiedOn, boolean registered, boolean archived) {
        this.name = name;
        this.price = price;
        this.productsWithAdaption = List.of();
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.registered = registered;
        this.archived = archived;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public Instant getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Instant modifiedOn) {
        this.modifiedOn = modifiedOn;
    }

    public boolean isRegistered() {
        return registered;
    }

    public void setRegistered(boolean registered) {
        this.registered = registered;
    }

    public int getId() {
        return id;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public Collection<Product> getProductsWithAdaption() {
        return productsWithAdaption;
    }

    public void setProductsWithAdaption(Collection<Product> productsWithAdaption) {
        this.productsWithAdaption = productsWithAdaption;
    }
}
