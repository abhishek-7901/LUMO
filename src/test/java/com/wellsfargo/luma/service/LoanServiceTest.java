package com.wellsfargo.luma.service;


import com.wellsfargo.luma.controller.AdminController;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.repository.LoanRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Slf4j
@SpringBootTest
class LoanServiceTest {
    @Autowired
    private LoanService loanService;

    @MockBean
    private LoanRepository loanRepository ;

    private List<Loan> loanList ;
    Loan l1, l2, l3, l4 ;

    @BeforeEach
    void setup(){
        l1 = Loan.builder()
                .loanId("L001")
                .duration(7)
                .type("furniture")
                .status(false)
                .build() ;
        l2 = Loan.builder()
                .loanId("L002")
                .duration(3)
                .type("furniture")
                .build() ;
        l3 = Loan.builder()
                .loanId("L003")
                .duration(4)
                .type("furniture")
                .build() ;
        l4 = Loan.builder()
                .loanId("L004")
                .duration(7)
                .type("Crockery")
                .build() ;
        loanList = new ArrayList<Loan>() ;
        loanList.add(l1) ;
        loanList.add(l2) ;
        loanList.add(l3) ;
        loanList.add(l4) ;

    }

    @Test
    void testAddLoanCard(){
        when(loanRepository.save(any(Loan.class))).thenAnswer(invocationOnMock -> {
            Object[] args = invocationOnMock.getArguments() ;
            return (Loan)args[0] ;
        });

        Loan addedLoan = loanService.addLoanCard(l1) ;
        assertThat(addedLoan.getStatus()).isFalse() ;
        assertThat(addedLoan).usingRecursiveComparison().isEqualTo(l1);
    }

    @Test
    void testFindLoanByLoanId(){
        when(loanRepository.findLoanByLoanId(any(String.class))).thenAnswer(invocationOnMock -> {
            return l1 ;
        }) ;

        Loan foundLoan = loanService.findLoanByLoanId("L001") ;
        assertThat(foundLoan).usingRecursiveComparison().isEqualTo(l1) ;
    }

    @Test
    void testGetLoanCards(){
        when(loanRepository.findAll()).thenReturn(loanList) ;
        List<Loan> rlist = loanService.getLoanCards() ;
        Assertions.assertEquals(loanList.size(), rlist.size()) ;
    }
}
