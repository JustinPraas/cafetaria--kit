package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import nl.praas.cafetariasolution.fp.cms.repositories.AdaptionRepository;
import nl.praas.cafetariasolution.fp.cms.repositories.ProductRepository;
import nl.praas.cafetariasolution.fp.cms.utils.CurrencyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import java.math.BigInteger;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Transactional
public class AdaptionService {

    @Autowired
    private AdaptionRepository adaptionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    public List<Adaption> getAllAdaptions() {
        return adaptionRepository.findAll();
    }

    public Adaption createAdaption(AdaptionCreateUpdateDto adaptionCreateUpdateDto) {
        Adaption adaption = new Adaption(
                adaptionCreateUpdateDto.getName(),
                CurrencyUtils.parse(adaptionCreateUpdateDto.getPrice()),
                Instant.now(),
                null,
                true,
                false);

        return adaptionRepository.save(adaption);
    }

    public Adaption updateAdaption(int id, AdaptionCreateUpdateDto adaptionCreateUpdateDto) {
        Adaption adaption = adaptionRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "De aanpassing kon niet gevonden worden"));

        adaption.setModifiedOn(Instant.now());
        adaption.setName(adaptionCreateUpdateDto.getName());
        adaption.setPrice(CurrencyUtils.parse(adaptionCreateUpdateDto.getPrice()));

        return adaptionRepository.save(adaption);
    }

    public boolean archiveAdaption(int id) {
        if (!adaptionRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "De aanpassing kon niet gevonden worden");
        }

        Adaption adaption = adaptionRepository.getById(id);
        adaption.setArchived(true);

        // Clear linked products
        adaption.getProductsWithAdaption().clear();

        adaptionRepository.save(adaption);

        return true;
    }

    public Adaption linkProductsToAdaption(int id, List<Integer> productIds) {
        List<Product> products = productRepository.findAllById(productIds);
        Adaption adaption = adaptionRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "De aanpassing kon niet gevonden worden"));

        adaption.getProductsWithAdaption().clear();
        adaption.getProductsWithAdaption().addAll(products);
        return adaptionRepository.save(adaption);
    }

    public Product linkAdaptionsToProduct(int id, List<Integer> adaptionIds) {
        List<Adaption> adaptions = adaptionRepository.findAllById(adaptionIds);
        Product product = productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Het product kon niet gevonden worden"));

        product.getPossibleAdaptions().clear();
        product.getPossibleAdaptions().addAll(adaptions);
        return productRepository.save(product);
    }

    public Map<Integer, Integer> getAdaptionRanks() {
        List<Object[]> results = entityManager.createNativeQuery("" +
                "SELECT t.adaption_id as adaptionId, COUNT(t) AS total\n" +
                "FROM product_order_adaption_mappings as t\n" +
                "GROUP BY t.adaption_id").getResultList();

        Map<Integer, Integer> ranks = new HashMap<>();

        results.forEach(result -> {
            int adaptionId = (int) result[0];
            int rank = ((BigInteger) result [1]).intValue();
            ranks.put(adaptionId, rank);
        });

        return ranks;
    }
}
