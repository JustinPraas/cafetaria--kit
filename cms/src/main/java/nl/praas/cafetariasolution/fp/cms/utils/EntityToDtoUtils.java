package nl.praas.cafetariasolution.fp.cms.utils;

import nl.praas.cafetariasolution.api.dto.category.CategoryFullDto;
import nl.praas.cafetariasolution.api.dto.order.OrderFullDto;
import nl.praas.cafetariasolution.api.dto.order.PaymentType;
import nl.praas.cafetariasolution.api.dto.order.ProductOrderShortDto;
import nl.praas.cafetariasolution.api.dto.product.PriceType;
import nl.praas.cafetariasolution.api.dto.product.ProductShortDto;
import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.fp.cms.entities.order.Order;
import nl.praas.cafetariasolution.fp.cms.entities.order.ProductOrder;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;

import java.util.stream.Collectors;

import static nl.praas.cafetariasolution.fp.cms.utils.CurrencyUtils.priceToString;

public final class EntityToDtoUtils {

    public static ProductOrderShortDto convertToProductOrderShortDto(ProductOrder productOrder) {
        return new ProductOrderShortDto(
                productOrder.getId(),
                productOrder.getOrder().getId(),
                productOrder.getProduct().getId(),
                priceToString(productOrder.getPrice()),
                productOrder.getQuantity(),
                productOrder.getAdjustment()
        );
    }

    public static OrderFullDto convertToOrderFullDto(Order order) {
        return new OrderFullDto(
                order.getId(),
                order.getCustomerName(),
                order.getProductOrders().stream()
                        .map(EntityToDtoUtils::convertToProductOrderShortDto)
                        .collect(Collectors.toList()),
                order.getCreatedOn(),
                order.getModifiedOn(),
                order.getPaidOn(),
                PaymentType.valueOf(order.getPaymentType().name())
        );
    }

    public static ProductShortDto convertToProductShortDto(Product product) {
        return new ProductShortDto(product.getId(),
                product.getName(),
                product.getCategory().getId(),
                PriceType.valueOf(product.getPriceType().name()),
                priceToString(product.getPrice()),
                product.getCreatedOn(),
                product.getModifiedOn(),
                product.isActive(),
                product.isArchived());
    }

    public static CategoryFullDto convertToCategoryFullDto(Category category) {
        return new CategoryFullDto(category.getId(),
                category.getName(),
                category.getColorHex(),
                category.getProducts().stream().map(EntityToDtoUtils::convertToProductShortDto).collect(Collectors.toList()),
                category.getCreatedOn(),
                category.getModifiedOn(),
                category.isActive(),
                category.isArchived()
        );
    }
}
