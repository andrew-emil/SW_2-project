package com.example.lost_found_item_service.repository;

import com.example.lost_found_item_service.enums.Status;
import com.example.lost_found_item_service.model.LostFoundItemModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LostFoundItemRepository extends JpaRepository<LostFoundItemModel, Long> {

    List<LostFoundItemModel> findByUserId(Long userId);

    List<LostFoundItemModel> findByStatus(Status status);
}
