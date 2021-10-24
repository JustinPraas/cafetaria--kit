package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;
import nl.praas.cafetariasolution.api.dto.order.OrderCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.entities.order.Order;
import nl.praas.cafetariasolution.fp.cms.entities.order.PaymentType;
import nl.praas.cafetariasolution.fp.cms.entities.order.ProductOrder;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import nl.praas.cafetariasolution.fp.cms.repositories.AdaptionRepository;
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
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
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

    @Autowired
    private AdaptionRepository adaptionRepository;

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
                        price = CurrencyUtils.parse(pocud.getPrice());
                    } else {
                        price = product.getPrice();
                    }

                    List<Adaption> adaptions = getAllAdaptions(pocud.getAppliedAdaptionShortDtos());

                    ProductOrder po = new ProductOrder(
                            order,
                            product,
                            adaptions,
                            price,
                            pocud.getQuantity()
                    );

                    if (pocud.getId() != null && pocud.getId().isPresent()) {
                        po.setId(pocud.getId().get());
                    }

                    return po;
                })
                .collect(Collectors.toList());
    }

    private List<Adaption> getAllAdaptions(List<AdaptionShortDto> adaptionShortDtos) {
        List<Adaption> result = new java.util.ArrayList<>();

        adaptionShortDtos.forEach(asd -> {
            if (asd.getId().isPresent()) {
                Adaption adaption = adaptionRepository.findById(asd.getId().get()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Een van de aanpassingen is niet geldig"));
                result.add(adaption);
            } else {

                Adaption adaption = new Adaption(
                        asd.getName(),
                        new BigDecimal(0),
                        Instant.now(),
                        null,
                        false,
                        true);

                result.add(adaption);
            }
        });

        return result;
    }

    public void deleteOrder(int id) {
        if (!orderRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De bestelling bestaat niet");
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

    public Order payOrder(int id, String paymentType) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "De bestelling kon niet gevonden worden" ));
        order.setPaidOn(Instant.now());
        order.setPaymentType(PaymentType.valueOf(paymentType));

        return orderRepository.save(order);
    }
}
