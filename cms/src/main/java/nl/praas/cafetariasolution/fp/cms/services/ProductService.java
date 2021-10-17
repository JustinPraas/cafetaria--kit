package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.fp.cms.entities.product.PriceType;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import nl.praas.cafetariasolution.api.dto.product.ProductCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.repositories.CategoryRepository;
import nl.praas.cafetariasolution.fp.cms.repositories.ProductRepository;
import nl.praas.cafetariasolution.fp.cms.utils.CurrencyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.Instant;
import java.util.List;

@Component
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(ProductCreateUpdateDto productCreateUpdateDto) throws ParseException {
        validateProduct(productCreateUpdateDto);
        validateCategoryExists(productCreateUpdateDto.getCategoryId());

        Category category = categoryRepository.getById(productCreateUpdateDto.getCategoryId());

        PriceType priceType = PriceType.valueOf(productCreateUpdateDto.getPriceType().name());
        BigDecimal price = getPriceBigDecimal(productCreateUpdateDto, priceType);

        Product product = new Product(productCreateUpdateDto.getName(),
                category,
                priceType,
                price,
                Instant.now(),
                null,
                productCreateUpdateDto.isActive(),
                false);

        return productRepository.save(product);
    }

    public Product updateProduct(int id, ProductCreateUpdateDto productCreateUpdateDto) throws ParseException {
        validateProduct(productCreateUpdateDto);
        validateProductExists(id);
        validateCategoryExists(productCreateUpdateDto.getCategoryId());

        Category category = categoryRepository.getById(productCreateUpdateDto.getCategoryId());

        PriceType priceType = PriceType.valueOf(productCreateUpdateDto.getPriceType().name());
        BigDecimal price = getPriceBigDecimal(productCreateUpdateDto, priceType);

        Product product = productRepository.getById(id);
        product.setName(productCreateUpdateDto.getName());
        product.setPriceType(priceType);
        product.setPrice(price);
        product.setModifiedOn(Instant.now());
        product.setCategory(category);
        product.setActive(productCreateUpdateDto.isActive());

        return productRepository.save(product);
    }

    private BigDecimal getPriceBigDecimal(ProductCreateUpdateDto productCreateUpdateDto, PriceType priceType) throws ParseException {
        BigDecimal price = null;
        switch (priceType) {
            case FIXED:
                price = CurrencyUtils.parse(productCreateUpdateDto.getPrice());
                break;
            case VARIABLE:
                price = null;
                break;
            case FREE:
                price = new BigDecimal(0);
                break;
        }
        return price;
    }

    public boolean archiveProduct(int id) {
        validateProductExists(id);

        Product product = productRepository.getById(id);
        product.setArchived(true);
        product.setName(product.getName() + " - archived");
        productRepository.save(product);

        return true;
    }

    private void validateProductExists(int id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Het product bestaat niet");
        }
    }

    private void validateCategoryExists(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De categorie bestaat niet");
        }
    }

    private void validateProduct(ProductCreateUpdateDto productCreateUpdateDto) {
        validateProductPriceValid(productCreateUpdateDto);
    }

    private void validateProductPriceValid(ProductCreateUpdateDto productCreateUpdateDto) {
        if (productCreateUpdateDto.getPrice() == null) {
            return;
        }

        try {
            CurrencyUtils.parse(productCreateUpdateDto.getPrice());
        } catch (ParseException | IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Het aangegeven bedrag voldoet niet aan de format eis");
        }
    }
}
