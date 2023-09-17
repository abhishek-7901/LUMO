package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public Loan addLoanCard(Loan loan){
        return loanRepository.save(loan);
    }
}
