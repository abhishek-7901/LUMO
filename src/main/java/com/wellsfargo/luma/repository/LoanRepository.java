package com.wellsfargo.luma.repository;

import com.wellsfargo.luma.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface LoanRepository extends JpaRepository<Loan,Long> {

    public Loan findLoanByLoanId(String Id);
}
