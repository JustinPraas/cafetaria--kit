package nl.praas.cafetariasolution.fp.cms.entities.product;

import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.entities.category.Category;

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
import java.time.Instant;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "PRODUCTS")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "PRODUCTS_ADAPTION_MAPPINGS",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "adaption_id"))
    private Collection<Adaption> possibleAdaptions;

    private PriceType priceType;

    private BigDecimal price;

    private Integer sequenceOrder;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean active;

    private boolean archived;

    Product() { }

    public Product(String name, Category category, Collection<Adaption> possibleAdaptions, PriceType priceType, BigDecimal price, Integer sequenceOrder, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        this.name = name;
        this.possibleAdaptions = possibleAdaptions;
        this.priceType = priceType;
        this.price = price;
        this.category = category;
        this.sequenceOrder = sequenceOrder;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.active = active;
        this.archived = archived;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public Instant getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Instant modifiedOn) {
        this.modifiedOn = modifiedOn;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
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
        Product product = (Product) o;
        return id == product.id && active == product.active && Objects.equals(name, product.name) && Objects.equals(category, product.category) && Objects.equals(createdOn, product.createdOn) && Objects.equals(modifiedOn, product.modifiedOn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price, category, createdOn, modifiedOn, active);
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", category=" + category +
                ", createdOn=" + createdOn +
                ", modifiedOn=" + modifiedOn +
                ", active=" + active +
                '}';
    }

    public PriceType getPriceType() {
        return priceType;
    }

    public void setPriceType(PriceType priceType) {
        this.priceType = priceType;
    }

    public Collection<Adaption> getPossibleAdaptions() {
        return possibleAdaptions;
    }

    public void setPossibleAdaptions(Collection<Adaption> possibleAdaptions) {
        this.possibleAdaptions = possibleAdaptions;
    }

    public Integer getSequenceOrder() {
        return sequenceOrder;
    }

    public void setSequenceOrder(Integer sequenceOrder) {
        this.sequenceOrder = sequenceOrder;
    }
}
