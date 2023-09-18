package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Item;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item addItem(Item item){
        item.setStatus(false);
        return itemRepository.save(item);
    }

    public Item findItemByItemId(String Id){
        return itemRepository.findItemByItemId(Id);
    }

    public List<Item> getItems(){
        return itemRepository.findAll();
    }

    public int changeItemStatus(String Id, Boolean status){
        return itemRepository.changeItemStatus(Id,status);
    }

    public List<Item>findItemByStatus(Boolean status){
        return itemRepository.findItemByStatus(status);
    }
}
