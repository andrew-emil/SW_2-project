package com.example.lost_found_item_service.service;

import com.example.lost_found_item_service.dtos.AddItemDto;
import com.example.lost_found_item_service.enums.ItemType;
import com.example.lost_found_item_service.enums.Status;
import com.example.lost_found_item_service.model.LostFoundItemModel;
import com.example.lost_found_item_service.repository.LostFoundItemRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LostFoundItemService {
    @Autowired
    private LostFoundItemRepository lostFoundItemRepository;

    public List<LostFoundItemModel> listAllItems(){
        return lostFoundItemRepository.findByStatus(Status.APPROVED);
    }

    public List<LostFoundItemModel> listPendingItems(){
        return lostFoundItemRepository.findByStatus(Status.PENDING);
    }

    public void addItem(AddItemDto addItemDto, Long userId){
        LostFoundItemModel item = LostFoundItemModel.builder()
                .type(ItemType.LOST)
                .name(addItemDto.getName())
                .lostFoundDate(addItemDto.getDate())
                .lostFoundLocation(addItemDto.getLocation())
                .category(addItemDto.getCategory())
                .description(addItemDto.getDescription())
                .status(Status.PENDING)
                .userId(userId)
                .build();

        lostFoundItemRepository.save(item);
    }

    public List<LostFoundItemModel> listOwnerLostItems(Long userId){
        return lostFoundItemRepository.findByUserId(userId);
    }

    public boolean updateItem(Long id){
        boolean isExist = lostFoundItemRepository.existsById(id);
        if(isExist){
            lostFoundItemRepository.findById(id).map(
                    item -> {
                        if (item.getType() == ItemType.LOST) {
                            item.setType(ItemType.FOUND);
                            return lostFoundItemRepository.save(item);
                        }
                        throw new IllegalStateException("Item is already marked as FOUND");
                    }
            );
        }
        return isExist;
    }

    public Optional<LostFoundItemModel> getItem(Long id){
        return lostFoundItemRepository.findById(id);
    }

    public void deleteItem(Long id){
        lostFoundItemRepository.deleteById(id);
    }

    public boolean approveOrRejectReport(boolean isApproved, Long itemId){
        boolean isExist = lostFoundItemRepository.existsById(itemId);
        if(isExist){
            lostFoundItemRepository.findById(itemId).map(
                    item -> {
                        if(item.getStatus() == Status.PENDING){
                            if(isApproved){
                                item.setStatus(Status.APPROVED);
                            }else {
                                item.setStatus(Status.REJECTED);
                            }

                            return lostFoundItemRepository.save(item);
                        }
                        throw new IllegalStateException("Item is already marked as FOUND");
                    }
            );
        }
        return isExist;
    }
}
