package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public Loan addLoanCard(Loan loan){
        return loanRepository.save(loan);
    }

    public Loan findLoanByLoanId(String Id){
        return loanRepository.findLoanByLoanId(Id);
    }

    public List<Loan> getLoanCards(){
        return loanRepository.findAll();
    }
}
