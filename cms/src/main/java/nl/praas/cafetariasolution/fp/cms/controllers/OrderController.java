package nl.praas.cafetariasolution.fp.cms.controllers;

import nl.praas.cafetariasolution.api.dto.order.OrderCreateUpdateDto;
import nl.praas.cafetariasolution.api.dto.order.OrderFullDto;
import nl.praas.cafetariasolution.fp.cms.entities.order.Order;
import nl.praas.cafetariasolution.fp.cms.services.OrderService;
import nl.praas.cafetariasolution.fp.cms.utils.EntityToDtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderFullDto> getOrders() {
        return orderService.getAllOrders().stream()
                .map(EntityToDtoUtils::convertToOrderFullDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public OrderFullDto createOrder(@RequestBody OrderCreateUpdateDto orderCreateUpdateDto) {
        try {
            Order order = orderService.createOrder(orderCreateUpdateDto);
            return EntityToDtoUtils.convertToOrderFullDto(order);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Een product gekoppeld aan deze bestelling bestaat niet");
        }
    }

    @PutMapping("/{id}")
    public OrderFullDto updateOrder(@PathVariable int id, @RequestBody OrderCreateUpdateDto orderCreateUpdateDto) {
        try {
            Order order = orderService.updateOrder(id, orderCreateUpdateDto);
            return EntityToDtoUtils.convertToOrderFullDto(order);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Een product gekoppeld aan deze bestelling bestaat niet");
        }
    }

    @DeleteMapping("/{id}")
    public boolean deleteOrder(@PathVariable int id) {
        try {
            orderService.deleteOrder(id);
            return true;
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De bestelling bestaat niet");
        }
    }
}
