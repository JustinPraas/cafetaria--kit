package nl.praas.cafetariasolution.api.dto.adaption;

import java.util.Map;

public class AdaptionRanksDto {

    private final Map<Integer, Integer> adaptionRanks;

    public AdaptionRanksDto(Map<Integer, Integer> adaptionRanks) {
        this.adaptionRanks = adaptionRanks;
    }

    public Map<Integer, Integer> getAdaptionRanks() {
        return adaptionRanks;
    }
}
