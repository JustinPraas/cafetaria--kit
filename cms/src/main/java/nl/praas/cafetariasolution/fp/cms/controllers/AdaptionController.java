package nl.praas.cafetariasolution.fp.cms.controllers;

import nl.praas.cafetariasolution.api.dto.adaption.AdaptionCreateUpdateDto;
import nl.praas.cafetariasolution.api.dto.adaption.AdaptionFullDto;
import nl.praas.cafetariasolution.api.dto.adaption.AdaptionRanksDto;
import nl.praas.cafetariasolution.api.dto.product.ProductFullDto;
import nl.praas.cafetariasolution.fp.cms.entities.adaption.Adaption;
import nl.praas.cafetariasolution.fp.cms.services.AdaptionService;
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
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/adaptions")
public class AdaptionController {

    @Autowired
    private AdaptionService adaptionService;

    @GetMapping("/ranks")
    public AdaptionRanksDto getAdaptionRanks() {
        return new AdaptionRanksDto(this.adaptionService.getAdaptionRanks());
    }

    @GetMapping
    public List<AdaptionFullDto> getAdaptions() {
        return this.adaptionService.getAllAdaptions().stream()
                .filter(adaption -> !adaption.isArchived())
                .map(EntityToDtoUtils::convertToAdaptionFullDto).collect(Collectors.toList());
    }

    @PostMapping
    public AdaptionFullDto createAdaption(@RequestBody AdaptionCreateUpdateDto adaptionCreateUpdateDto) {
        return EntityToDtoUtils.convertToAdaptionFullDto(this.adaptionService.createAdaption(adaptionCreateUpdateDto));
    }

    @PutMapping("/{id}")
    public AdaptionFullDto updateAdaption(@PathVariable int id, @RequestBody AdaptionCreateUpdateDto adaptionCreateUpdateDto) {
        return EntityToDtoUtils.convertToAdaptionFullDto(this.adaptionService.updateAdaption(id, adaptionCreateUpdateDto));
    }

    @DeleteMapping("/{id}")
    public boolean archiveAdaption(@PathVariable int id) {
        return this.adaptionService.archiveAdaption(id);
    }

    @PutMapping("/{id}/linkProducts")
    public AdaptionFullDto linkProductsToAdaption(@PathVariable int id, @RequestBody List<Integer> productIds) {
        return EntityToDtoUtils.convertToAdaptionFullDto(this.adaptionService.linkProductsToAdaption(id, productIds));
    }

    @PutMapping("/{id}/linkAdaptions")
    public ProductFullDto linkAdaptionsToProduct(@PathVariable int id, @RequestBody List<Integer> adaptionIds) {
        return EntityToDtoUtils.convertToProductFullDto(this.adaptionService.linkAdaptionsToProduct(id, adaptionIds));
    }
}
