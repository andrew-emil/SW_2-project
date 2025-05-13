package com.example.lost_found_item_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
public class ApproveOrRejectDto {
    @JsonProperty("isApproved")
    private boolean isApproved;

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public boolean isApproved() {
        return isApproved;
    }
}
