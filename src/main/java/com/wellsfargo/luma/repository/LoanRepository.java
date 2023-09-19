package com.wellsfargo.luma.repository;

import com.wellsfargo.luma.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface LoanRepository extends JpaRepository<Loan,Long> {

    public Loan findLoanByLoanId(String Id);

    @Modifying
    @Query("UPDATE Loan u SET u.status = ?2 WHERE u.loanId = ?1")
    public int changeLoanStatus(String Id, Boolean status);

    public List<Loan> findLoanByTypeAndStatus(String type, Boolean status);

}
