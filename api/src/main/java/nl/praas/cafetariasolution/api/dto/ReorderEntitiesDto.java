package nl.praas.cafetariasolution.api.dto;

import java.util.Map;

public class ReorderEntitiesDto {

    private Map<Integer, Integer> idToSequenceOrderMap;

    private ReorderEntitiesDto() { }

    public ReorderEntitiesDto(Map<Integer, Integer> idToSequenceOrderMap) {
        this.idToSequenceOrderMap = idToSequenceOrderMap;
    }

    public Map<Integer, Integer> getIdToSequenceOrderMap() {
        return idToSequenceOrderMap;
    }
}
