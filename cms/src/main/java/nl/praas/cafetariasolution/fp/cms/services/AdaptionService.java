package nl.praas.cafetariasolution.fp.cms.services;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionCreateUpdateDto;
import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.entities.product.Product;
import nl.praas.cafetariasolution.fp.cms.repositories.AdaptionRepository;
import nl.praas.cafetariasolution.fp.cms.utils.CurrencyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Component
@Transactional
public class AdaptionService {

    @Autowired
    private AdaptionRepository adaptionRepository;

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
        adaption.setName(adaption.getName() + " - archived");
        adaptionRepository.save(adaption);

        return true;
    }
}