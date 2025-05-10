package com.example.lost_found_item_service.dtos;

import com.example.lost_found_item_service.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddItemDto {
    @NotBlank(message = "name is required")
    private String name;

    @NotNull(message = "date is required")
    private Date date;

    @NotBlank(message = "Location is required")
    private  String location;

    private Category category;

    private String description;
}
