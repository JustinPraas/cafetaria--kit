package nl.praas.cafetariasolution.fp.cms.utils;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionFullDto;
import nl.praas.cafetariasolution.api.dto.adaption.AdaptionShortDto;
import nl.praas.cafetariasolution.api.dto.category.CategoryFullDto;
import nl.praas.cafetariasolution.api.dto.category.CategoryShortDto;
import nl.praas.cafetariasolution.api.dto.order.OrderFullDto;
import nl.praas.cafetariasolution.api.dto.order.PaymentType;
import nl.praas.cafetariasolution.api.dto.order.ProductOrderShortDto;
import nl.praas.cafetariasolution.api.dto.product.PriceType;
import nl.praas.cafetariasolution.api.dto.product.ProductFullDto;
import nl.praas.cafetariasolution.api.dto.product.ProductShortDto;
import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.fp.cms.entities.order.Order;
import nl.praas.cafetariasolution.fp.cms.entities.order.ProductOrder;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;

import java.util.Optional;
import java.util.stream.Collectors;

import static nl.praas.cafetariasolution.fp.cms.utils.CurrencyUtils.priceToString;

public final class EntityToDtoUtils {

    public static AdaptionShortDto convertToAdaptionShortDto(Adaption adaption) {
        return new AdaptionShortDto(
                Optional.of(adaption.getId()),
                adaption.getName(),
                priceToString(adaption.getPrice())
        );
    }

    public static AdaptionFullDto convertToAdaptionFullDto(Adaption adaption) {
        return new AdaptionFullDto(
                adaption.getId(),
                adaption.getName(),
                priceToString(adaption.getPrice()),
                adaption.getProductsWithAdaption().stream().map(EntityToDtoUtils::convertToProductShortDto).collect(Collectors.toList()),
                adaption.getCreatedOn(),
                adaption.getModifiedOn(),
                adaption.isRegistered(),
                adaption.isArchived());
    }

    public static ProductOrderShortDto convertToProductOrderShortDto(ProductOrder productOrder) {
        return new ProductOrderShortDto(
                productOrder.getId(),
                productOrder.getOrder().getId(),
                productOrder.getProduct().getId(),
                priceToString(productOrder.getPrice()),
                productOrder.getAppliedAdaptions().stream().map(EntityToDtoUtils::convertToAdaptionShortDto).collect(Collectors.toList()),
                productOrder.getQuantity()
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
                Optional.ofNullable(product.getSequenceOrder()),
                product.getCreatedOn(),
                product.getModifiedOn(),
                product.isActive(),
                product.isArchived());
    }

    public static ProductFullDto convertToProductFullDto(Product product) {
        return new ProductFullDto(product.getId(),
                product.getName(),
                product.getCategory().getId(),
                PriceType.valueOf(product.getPriceType().name()),
                priceToString(product.getPrice()),
                product.getPossibleAdaptions().stream().map(EntityToDtoUtils::convertToAdaptionShortDto).collect(Collectors.toList()),
                Optional.ofNullable(product.getSequenceOrder()),
                product.getCreatedOn(),
                product.getModifiedOn(),
                product.isActive(),
                product.isArchived());
    }

    public static CategoryFullDto convertToCategoryFullDto(Category category) {
        return new CategoryFullDto(category.getId(),
                category.getName(),
                category.getColorHex(),
                Optional.ofNullable(category.getSequenceOrder()),
                category.getProducts().stream().map(EntityToDtoUtils::convertToProductShortDto).collect(Collectors.toList()),
                category.getCreatedOn(),
                category.getModifiedOn(),
                category.isActive(),
                category.isArchived()
        );
    }

    public static CategoryShortDto convertToCategoryShortDto(Category category) {
        return new CategoryShortDto(category.getId(),
                category.getName(),
                category.getColorHex(),
                Optional.ofNullable(category.getSequenceOrder()),
                category.getProducts().stream().map(p -> p.getId()).collect(Collectors.toList()),
                category.getCreatedOn(),
                category.getModifiedOn(),
                category.isActive(),
                category.isArchived()
        );
    }
}
