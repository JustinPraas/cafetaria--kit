package nl.praas.cafetariasolution.fp.cms.repositories;

import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByName(String name);

    @Query("SELECT max(product.sequenceOrder) from Product product where product.category.id = :#{#categoryId}")
    Optional<Integer> findMaxSequenceOrderInCategory(@Param("categoryId") int categoryId);
}
