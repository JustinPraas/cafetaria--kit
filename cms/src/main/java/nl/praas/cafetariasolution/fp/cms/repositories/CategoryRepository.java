package nl.praas.cafetariasolution.fp.cms.repositories;

import nl.praas.cafetariasolution.fp.cms.entities.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByName(String name);

    @Query("SELECT max(category.sequenceOrder) from Category category")
    Optional<Integer> findMaxSequenceOrder();
}
