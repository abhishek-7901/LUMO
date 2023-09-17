package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.IssuedCard;
import com.wellsfargo.luma.repository.IssuedCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssuedCardService {

    @Autowired
    private IssuedCardRepository issuedCardRepository;

    public IssuedCard addCard(IssuedCard issuedCard){
        return issuedCardRepository.save(issuedCard);
    }
}
