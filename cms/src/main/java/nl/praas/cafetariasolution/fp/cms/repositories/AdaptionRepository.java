package nl.praas.cafetariasolution.fp.cms.repositories;

import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AdaptionRepository extends JpaRepository<Adaption, Integer> {

    @Query("SELECT max(category.sequenceOrder) from Category category")
    Optional<Integer> findMaxSequenceOrder();
}
