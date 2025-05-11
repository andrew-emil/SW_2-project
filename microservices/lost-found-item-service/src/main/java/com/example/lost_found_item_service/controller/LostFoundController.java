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

    @GetMapping("/list-all-items")
    public ResponseEntity<List<LostFoundItemModel>> listAllItems(){
        return ResponseEntity.ok(service.listAllItems());
    }

    @PostMapping("/add-item")
    public ResponseEntity<String> addItem(@RequestBody AddItemDto item, @RequestParam long userId) {
        service.addItem(item, userId);
        return ResponseEntity.ok("Item added successfully");
    }
    @PostMapping("/list-owner-items")
    public ResponseEntity<List<LostFoundItemModel>> listOwnerLostItems(@RequestBody Long userId) {
        return  ResponseEntity.ok(service.listOwnerLostItems(userId));
    }
    @PostMapping("/update-item")
    public ResponseEntity<String> updatItem(@RequestBody Long id) {
        if (service.updateItem(id)){
            return ResponseEntity.ok("Item Updated Successfully");
        }
        return ResponseEntity.ok("There is something went wrong");
    }
    @PostMapping("get-item")
    public ResponseEntity<Optional<LostFoundItemModel>> getItem(long id){
        return ResponseEntity.ok(service.getItem(id));
    }
    @PostMapping("delete-item")
    public ResponseEntity<String> deleteItem(long id){
        service.deleteItem(id);
        return ResponseEntity.ok("Item Deleted Successfully");
    }
}
