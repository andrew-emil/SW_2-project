package com.example.lost_found_item_service.controller;

import com.example.lost_found_item_service.dtos.AddItemDto;
import com.example.lost_found_item_service.model.LostFoundItemModel;
import com.example.lost_found_item_service.service.LostFoundItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/LostFound")
public class LostFoundController {
    @Autowired
    private LostFoundItemService service;

    @GetMapping
    public ResponseEntity<List<LostFoundItemModel>> listAllItems(){
        return ResponseEntity.ok(service.listAllItems());
    }

    @PostMapping
    public ResponseEntity<String> addItem(@RequestBody AddItemDto item, @RequestParam long userId) {
        service.addItem(item, userId);
        return ResponseEntity.ok("Item added successfully");
    }
    @GetMapping("/{userId}")
    public ResponseEntity<List<LostFoundItemModel>> listOwnerLostItems(@PathVariable Long userId) {
        return  ResponseEntity.ok(service.listOwnerLostItems(userId));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<String> updateItem(@PathVariable Long itemId) {
        if (service.updateItem(itemId)){
            return ResponseEntity.ok("Item Updated Successfully");
        }
        return ResponseEntity.ok("There is something went wrong");
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<Optional<LostFoundItemModel>> getItem(@PathVariable Long itemId){
        return ResponseEntity.ok(service.getItem(itemId));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable Long itemId){
        service.deleteItem(itemId);
        return ResponseEntity.ok("Item Deleted Successfully");
    }
}
