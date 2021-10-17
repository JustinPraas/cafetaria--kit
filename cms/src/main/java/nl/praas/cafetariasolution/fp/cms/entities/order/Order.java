package nl.praas.cafetariasolution.fp.cms.entities.order;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.Instant;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "ORDERS")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String customerName;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @ElementCollection
    private Collection<ProductOrder> productOrders;

    private Instant createdOn;

    private Instant modifiedOn;

    private Instant paidOn;

    private PaymentType paymentType;

    public Order() { }

    public Order(String customerName, Collection<ProductOrder> productOrders, Instant createdOn, Instant modifiedOn, Instant paidOn, PaymentType paymentType) {
        this.customerName = customerName;
        this.productOrders = productOrders;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.paidOn = paidOn;
        this.paymentType = paymentType;
    }

    public int getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Collection<ProductOrder> getProductOrders() {
        return productOrders;
    }

    public void setProductOrders(Collection<ProductOrder> productOrders) {
        this.productOrders = productOrders;
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

    public Instant getPaidOn() {
        return paidOn;
    }

    public void setPaidOn(Instant paidOn) {
        this.paidOn = paidOn;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id == order.id && Objects.equals(customerName, order.customerName) && Objects.equals(productOrders, order.productOrders) && Objects.equals(createdOn, order.createdOn) && Objects.equals(modifiedOn, order.modifiedOn) && Objects.equals(paidOn, order.paidOn) && paymentType == order.paymentType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customerName, productOrders, createdOn, modifiedOn, paidOn, paymentType);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", productOrders=" + productOrders +
                ", createdOn=" + createdOn +
                ", modifiedOn=" + modifiedOn +
                ", paidOn=" + paidOn +
                ", paymentType=" + paymentType +
                '}';
    }
}
