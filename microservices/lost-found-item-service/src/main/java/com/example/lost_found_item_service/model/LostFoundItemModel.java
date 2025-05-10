package com.example.lost_found_item_service.model;

import com.example.lost_found_item_service.enums.Category;
import com.example.lost_found_item_service.enums.ItemType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "lost_found_item")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class LostFoundItemModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private ItemType type;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lost_found_date", nullable = false)
    private Date lostFoundDate;

    @Column(name = "lost_found_location", nullable = false)
    private String lostFoundLocation;

    @Column(name = "category")
    private Category category;

    @Column(name = "description")
    private String description;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
