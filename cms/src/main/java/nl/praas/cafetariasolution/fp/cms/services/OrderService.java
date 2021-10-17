package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.api.dto.order.OrderCreateUpdateDto;
import nl.praas.cafetariasolution.api.dto.order.ProductOrderCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.entities.order.Order;
import nl.praas.cafetariasolution.fp.cms.entities.order.PaymentType;
import nl.praas.cafetariasolution.fp.cms.entities.order.ProductOrder;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import nl.praas.cafetariasolution.fp.cms.repositories.OrderRepository;
import nl.praas.cafetariasolution.fp.cms.repositories.ProductOrderRepository;
import nl.praas.cafetariasolution.fp.cms.repositories.ProductRepository;
import nl.praas.cafetariasolution.fp.cms.utils.CurrencyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Transactional
public class OrderService {

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(OrderCreateUpdateDto orderCreateUpdateDto) throws NoSuchElementException {
        Order order = new Order(
                orderCreateUpdateDto.getCustomerName(),
                Collections.emptyList(),
                Instant.now(),
                null,
                null,
                PaymentType.UNKNOWN
        );

        List<ProductOrder> productOrders = getProductOrdersFromCreateUpdateDto(orderCreateUpdateDto, order);

        order.setProductOrders(productOrders);

        return orderRepository.save(order);
    }

    public Order updateOrder(int id, OrderCreateUpdateDto orderCreateUpdateDto) {
        validateExists(id);

        Order order = orderRepository.getById(id);
        order.setModifiedOn(Instant.now());

        List<ProductOrder> productOrders = getProductOrdersFromCreateUpdateDto(orderCreateUpdateDto, order);
        order.getProductOrders().clear();
        order.getProductOrders().addAll(productOrders);

        return orderRepository.save(order);
    }

    private List<ProductOrder> getProductOrdersFromCreateUpdateDto(OrderCreateUpdateDto orderCreateUpdateDto, Order order) {
        return orderCreateUpdateDto.getProductOrderCreateUpdateDtos().stream().map(
                pocud -> {
                    Product product = productRepository.findById(pocud.getProductId()).orElseThrow();
                    BigDecimal price;

                    if (product.getPrice() == null) {
                        try {
                            price = CurrencyUtils.parse(pocud.getPrice());
                        } catch (ParseException e) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De prijs voor het product " + pocud.getProductId() + " is ongeldig.");
                        }
                    } else {
                        price = product.getPrice();
                    }

                    ProductOrder po = new ProductOrder(
                            order,
                            product,
                            price,
                            pocud.getQuantity(),
                            pocud.getAdjustment()
                    );

                    if (pocud.getId() != null) {
                        po.setId(pocud.getId());
                    }

                    return po;
                })
                .collect(Collectors.toList());
    }

    public void deleteOrder(int id) throws NoSuchElementException {
        if (!orderRepository.existsById(id)) {
            throw new NoSuchElementException();
        }
        orderRepository.deleteById(id);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    private void validateExists(int id) {
        if (!orderRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De bestelling bestaat niet");
        }
    }
}
