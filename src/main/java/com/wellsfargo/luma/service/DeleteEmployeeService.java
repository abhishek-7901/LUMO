package com.wellsfargo.luma.service;


import com.wellsfargo.luma.model.IssuedCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeleteEmployeeService {
    @Autowired
    IssuedCardService issuedCardService ;

    @Autowired
    LoanService loanService ;

    @Autowired
    ItemService itemService ;

    public void deleteIssueCards(Long empId){
        List<IssuedCard> issuedCardList = issuedCardService.findIssuedCardByEmpId(empId);

        issuedCardList.forEach((card) -> {
            loanService.changeLoanStatus(card.getLoanId(), false) ;
            itemService.changeItemStatus(card.getItemId(), false) ;
            issuedCardService.deleteById(card.getIssueId());
        });
        //now we have to delete the issuecards themselves.

    }

}
