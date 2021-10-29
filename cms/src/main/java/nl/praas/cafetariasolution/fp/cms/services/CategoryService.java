package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.api.dto.ReorderEntitiesDto;
import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.api.dto.category.CategoryCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Component
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(CategoryCreateUpdateDto categoryCreateUpdateDto) {
        validateColorHex(categoryCreateUpdateDto.getColorHex());
        validateCategoryName(categoryCreateUpdateDto.getName());

        Integer lastSequenceOrder = categoryRepository.findMaxSequenceOrder().orElse(0);

        Category category = new Category(
                categoryCreateUpdateDto.getName(),
                categoryCreateUpdateDto.getColorHex(),
                List.of(),
                lastSequenceOrder +1,
                Instant.now(),
                null,
                categoryCreateUpdateDto.isActive(),
                false);

        return categoryRepository.save(category);
    }

    private void validateColorHex(String colorHex) {
        if (!colorHex.matches("#[a-fA-F0-9]{6}")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De kleurcode is niet geldig");
        }
    }

    public Category updateCategory(int id, CategoryCreateUpdateDto categoryCreateUpdateDto) {
        validateExists(id);
        validateCategoryName(categoryCreateUpdateDto.getName());
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
        category.setArchived(true);
        category.setSequenceOrder(null);
        category.getProducts().forEach(p -> p.setArchived(true));
        categoryRepository.save(category);

        return true;
    }

    private void validateCategoryName(String name) {
        if (name.length() < 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De categorienaam moet minstens 2 characters lang zijn");
        }
    }

    private void validateExists(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De categorie bestaat niet");
        }
    }

    public List<Category> reorderCategories(ReorderEntitiesDto reorderEntitiesDto) {
        Map<Integer, Integer> idToSequenceOrderMap = reorderEntitiesDto.getIdToSequenceOrderMap();
        List<Category> categories = categoryRepository.findAllById(reorderEntitiesDto.getIdToSequenceOrderMap().keySet());

        categories.forEach(category -> {
            category.setSequenceOrder(idToSequenceOrderMap.get(category.getId()));
        });

        return categoryRepository.saveAll(categories);
    }
}
