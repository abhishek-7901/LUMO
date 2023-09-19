package com.wellsfargo.luma.repository;

import com.wellsfargo.luma.model.Item;
import com.wellsfargo.luma.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ItemRepository extends JpaRepository<Item,Long> {

    public Item findItemByItemId(String Id);

    @Modifying
    @Query("UPDATE Item u SET u.status = ?2 WHERE u.itemId = ?1")
    public int changeItemStatus(String Id, Boolean status);

    public List<Item>findItemByStatus(Boolean status);

}
