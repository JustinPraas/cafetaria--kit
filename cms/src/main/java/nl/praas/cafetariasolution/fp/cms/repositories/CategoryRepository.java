package nl.praas.cafetariasolution.fp.cms.repositories;

import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByName(String name);
}
