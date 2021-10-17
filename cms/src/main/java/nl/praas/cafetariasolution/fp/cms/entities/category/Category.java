package nl.praas.cafetariasolution.fp.cms.entities.category;


import nl.praas.cafetariasolution.fp.cms.entities.product.Product;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "CATEGORIES")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String colorHex;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

    private Instant createdOn;

    private Instant modifiedOn;

    private boolean active;

    private boolean archived;

    public Category() {
    }

    public Category(String name, String colorHex, List<Product> products, Instant createdOn, Instant modifiedOn, boolean active, boolean archived) {
        this.name = name;
        this.colorHex = colorHex;
        this.products = products;
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

    public List<Product> getProducts() {
        return products;
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

    public String getColorHex() {
        return colorHex;
    }

    public void setColorHex(String colorHex) {
        this.colorHex = colorHex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id == category.id && active == category.active && archived == category.archived && Objects.equals(name, category.name) && Objects.equals(colorHex, category.colorHex) && Objects.equals(products, category.products) && Objects.equals(createdOn, category.createdOn) && Objects.equals(modifiedOn, category.modifiedOn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, colorHex, products, createdOn, modifiedOn, active, archived);
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", colorHex='" + colorHex + '\'' +
                ", products=" + products +
                ", createdOn=" + createdOn +
                ", modifiedOn=" + modifiedOn +
                ", active=" + active +
                ", archived=" + archived +
                '}';
    }
}
