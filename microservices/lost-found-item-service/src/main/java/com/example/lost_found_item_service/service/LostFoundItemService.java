package com.example.lost_found_item_service.service;

import com.example.lost_found_item_service.dtos.AddItemDto;
import com.example.lost_found_item_service.enums.ItemType;
import com.example.lost_found_item_service.model.LostFoundItemModel;
import com.example.lost_found_item_service.repository.LostFoundItemRepository;
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
        return new ArrayList<>(lostFoundItemRepository.findAll());
    }

    public void addItem(AddItemDto addItemDto, Long userId){
        LostFoundItemModel item = LostFoundItemModel.builer()
                .type(ItemType.LOST)
                .name(addItemDto.getName())
                .lostFoundDate(addItemDto.getDate())
                .lostFoundLocation(addItemDto.getLocation())
                .category(addItemDto.getCategory())
                .description(addItemDto.getDescription())
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
}
