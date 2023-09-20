package com.wellsfargo.luma.service


@ExtendWith(MockitoExtension.class)
@Slf4j
class LoanServiceTest{
    @InjectMocks
    private LoanService loanService ;


    @Mock
    private LoanRepository loanRepository ;

    private List<Loan> loans ;
    private Loan l1, l2, l3, l4, l5 ;
    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);

        l1 = Loan.builder()
                .loadId("L001")
                .type("furniture")
                .duration(7)
                .status(true)

        l2  = Loan.builder()
                .loadId("L002")
                .type("furniture")
                .duration(3)
                .status(false)

        l3 = Loan.builder()
                .loadId("L003")
                .type("glassware")
                .duration(4)
                .status(true)

        l4 = Loan.builder()
                .loadId("L004")
                .type("carpet")
                .duration(5)
                .status(false)

        loans.add(l1) ;
        loans.add(l2) ;
        loans.add(l3) ;
        loans.add(l4) ;
    }

    @Test
    void checkStatusBind(){
        when(loanRepository.save(loan)).thenReturn(loan) ;
    }

}