package nl.praas.cafetariasolution.fp.cms.controllers;

import nl.praas.cafetariasolution.api.dto.ReorderEntitiesDto;
import nl.praas.cafetariasolution.api.dto.category.CategoryFullDto;
import nl.praas.cafetariasolution.api.dto.product.ProductCreateUpdateDto;
import nl.praas.cafetariasolution.api.dto.product.ProductFullDto;
import nl.praas.cafetariasolution.api.dto.product.ProductShortDto;
import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import nl.praas.cafetariasolution.fp.cms.services.ProductService;
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

import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/short")
    public List<ProductShortDto> getProducts() {
        return productService.getProducts().stream()
                .filter(product -> !product.isArchived())
                .map(EntityToDtoUtils::convertToProductShortDto).collect(Collectors.toList());
    }

    @GetMapping("/full")
    public List<ProductFullDto> getProductsFull() {
        return productService.getProducts().stream()
                .filter(product -> !product.isArchived())
                .map(EntityToDtoUtils::convertToProductFullDto).collect(Collectors.toList());
    }

    @GetMapping("/archived")
    public List<ProductShortDto> getArchivedProducts() {
        return productService.getProducts().stream()
                .filter(Product::isArchived)
                .map(EntityToDtoUtils::convertToProductShortDto).collect(Collectors.toList());
    }

    @PostMapping
    public ProductShortDto createProduct(@RequestBody ProductCreateUpdateDto productCreateUpdateDto) {
        try {
            Product product = productService.createProduct(productCreateUpdateDto);
            return EntityToDtoUtils.convertToProductShortDto(product);
        } catch (ParseException | IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De meegegeven prijs heeft niet het juiste formaat");
        }
    }

    @PutMapping("/{id}")
    public ProductShortDto updateProduct(@PathVariable int id, @RequestBody ProductCreateUpdateDto productCreateUpdateDto) {
        try {
            Product product = productService.updateProduct(id, productCreateUpdateDto);
            return EntityToDtoUtils.convertToProductShortDto(product);
        } catch (ParseException | IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De meegegeven prijs heeft niet het juiste formaat");
        }
    }

    @DeleteMapping("/{id}")
    public boolean archiveCategory(@PathVariable int id) {
        return productService.archiveProduct(id);
    }

    @PutMapping("/reorder")
    public List<ProductShortDto> reorderProducts(@RequestBody ReorderEntitiesDto reorderEntitiesDto) {
        List<Product> reorderedProducts = productService.reorderProducts(reorderEntitiesDto);

        return reorderedProducts.stream().map(EntityToDtoUtils::convertToProductShortDto).collect(Collectors.toList());
    }
}
