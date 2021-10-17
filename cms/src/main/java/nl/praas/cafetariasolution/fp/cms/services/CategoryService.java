package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.api.dto.category.CategoryCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Component
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(CategoryCreateUpdateDto categoryCreateUpdateDto) {
        validateColorHex(categoryCreateUpdateDto.getColorHex());
        Category category = new Category(
                categoryCreateUpdateDto.getName(),
                categoryCreateUpdateDto.getColorHex(),
                List.of(),
                Instant.now(),
                null,
                categoryCreateUpdateDto.isActive(),
                false);

        return categoryRepository.save(category);
    }

    private void validateColorHex(String colorHex) {
        System.out.println(colorHex);
        if (!colorHex.matches("#[a-fA-F0-9]{6}")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De kleurcode is niet geldig");
        }
    }

    public Category updateCategory(int id, CategoryCreateUpdateDto categoryCreateUpdateDto) {
        validateExists(id);
        validateColorHex(categoryCreateUpdateDto.getColorHex());

        Category category = categoryRepository.getById(id);

        category.setColorHex(categoryCreateUpdateDto.getColorHex());
        category.setActive(categoryCreateUpdateDto.isActive());
        category.setModifiedOn(Instant.now());
        category.setName(categoryCreateUpdateDto.getName());

        return categoryRepository.save(category);
    }

    public boolean archiveCategory(int id) {
        validateExists(id);

        Category category = categoryRepository.getById(id);
        category.setName(category.getName() + " - archived");
        category.setArchived(true);
        category.getProducts().forEach(p -> p.setArchived(true));
        categoryRepository.save(category);

        return true;
    }

    private void validateExists(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De categorie bestaat niet");
        }
    }
}
