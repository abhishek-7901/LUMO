package com.wellsfargo.luma.repository;

import com.wellsfargo.luma.model.IssuedCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IssuedCardRepository extends JpaRepository<IssuedCard,Long> {
}
