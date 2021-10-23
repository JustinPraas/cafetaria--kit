package nl.praas.cafetariasolution.fp.cms.controllers;

import nl.praas.cafetariasolution.api.dto.ReorderEntitiesDto;
import nl.praas.cafetariasolution.api.dto.category.CategoryCreateUpdateDto;
import nl.praas.cafetariasolution.api.dto.category.CategoryFullDto;
import nl.praas.cafetariasolution.api.dto.category.CategoryShortDto;
import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import nl.praas.cafetariasolution.fp.cms.services.CategoryService;
import nl.praas.cafetariasolution.fp.cms.utils.EntityToDtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/full")
    public List<CategoryFullDto> getCategoriesFull() {
        return categoryService.getCategories().stream()
                .filter(c -> !c.isArchived())
                .map(EntityToDtoUtils::convertToCategoryFullDto).collect(Collectors.toList());
    }

    @GetMapping("/short")
    public List<CategoryShortDto> getCategoriesShort() {
        return categoryService.getCategories().stream()
                .filter(c -> !c.isArchived())
                .map(EntityToDtoUtils::convertToCategoryShortDto).collect(Collectors.toList());
    }

    @GetMapping("/archived")
    public List<CategoryFullDto> getArchivedCategories() {
        return categoryService.getCategories().stream()
                .filter(Category::isArchived)
                .map(EntityToDtoUtils::convertToCategoryFullDto).collect(Collectors.toList());
    }

    @PostMapping
    public CategoryFullDto createCategory(@RequestBody CategoryCreateUpdateDto categoryCreateUpdateDto) {
        Category category = categoryService.createCategory(categoryCreateUpdateDto);

        return EntityToDtoUtils.convertToCategoryFullDto(category);
    }

    @PutMapping("/{id}")
    public CategoryFullDto updateCategory(@PathVariable int id, @RequestBody CategoryCreateUpdateDto categoryCreateUpdateDto) {
        Category category = categoryService.updateCategory(id, categoryCreateUpdateDto);

        return EntityToDtoUtils.convertToCategoryFullDto(category);
    }

    @PutMapping("/reorder")
    public List<CategoryFullDto> reorderCategories(@RequestBody ReorderEntitiesDto reorderEntitiesDto) {
        List<Category> reorderedCategories = categoryService.reorderCategories(reorderEntitiesDto);

        return reorderedCategories.stream().map(EntityToDtoUtils::convertToCategoryFullDto).collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public boolean archiveCategory(@PathVariable int id) {
        return categoryService.archiveCategory(id);
    }
}
