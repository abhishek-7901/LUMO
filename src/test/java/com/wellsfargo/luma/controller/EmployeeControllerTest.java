package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.IssuedCard;
import com.wellsfargo.luma.model.Item;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.service.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Slf4j
//@WebMvcTest(AdminController.class)
@SpringBootTest
public class EmployeeControllerTest {

    @Autowired
    EmployeeController employeeController;

    @MockBean
    private JwtService jwtService;
    @MockBean
    private LoanService loanService;
    @MockBean
    private ItemService itemService;
    @MockBean
    private EmployeeService employeeService;
    @MockBean
    private IssuedCardService issuedCardService;
    @Autowired
    AdminController adminController;

    @InjectMocks
    private JwtService jwtService1;

    @MockBean
    public PasswordEncoder passwordEncoder;


    public static Employee emp;
    public String token;
    public Loan loan;
    public Item item;

    public IssuedCard issuedCard;

    @BeforeEach
    public void setup() {
        emp = new Employee();
        emp.setPassword("secret123");
        emp.setName("Ayush Paul");
        emp.setRole("EMP");
        emp.setDob(new Date());
        emp.setDepartment("TCOO");
        emp.setDoj(new Date());
        emp.setDesignation("Program Associate");
        emp.setEmployeeId(1L);

        loan = Loan.builder()
                .loanId("L001")
                .duration(3)
                .type("Furniture")
                .status(false)
                .id(1L)
                .build();

        issuedCard = IssuedCard.builder()
                .empId(1L)
                .loanId("L001")
                .issueId(1L)
                .itemId("I001")
                .build();

        item = new Item();
        item.setStatus(false);
        item.setId(1L);
        item.setItemId("I001");
        item.setMake("Wood");
        item.setCategory("Furniture");
        item.setValue(5000L);
        item.setDescription("Dinner Table");


        when(employeeService.addEmployee(any(Employee.class), any(String.class))).thenReturn(emp);
        when(employeeService.findByName(any(String.class))).thenReturn(Optional.of(emp));

        token = jwtService1.generateToken(emp.getName(), emp.getPassword());
        when(jwtService.generateToken(any(String.class), any(String.class))).thenReturn(jwtService1.generateToken(emp.getName(), emp.getPassword()));
        when(jwtService.extractUsername(any(String.class))).thenReturn(emp.getName());

    }


    @AfterEach
    void cleanUp() {
        emp = null;
        loan = null;
        item = null;
    }

    @Test
    void viewLoanCards() {

        List<IssuedCard> issuedCardList = new ArrayList<>();
        issuedCardList.add(issuedCard);

        when(issuedCardService.findIssuedCardByEmpId(any(Long.class))).thenReturn(issuedCardList);
        when(loanService.findLoanByLoanId(any(String.class))).thenReturn(loan);

        ResponseEntity<Map<String, Object>> empResponse = employeeController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED, empResponse.getStatusCode());

        ResponseEntity<Map<String, Object>> response = employeeController.viewLoanCards("Bearer " + empResponse.getBody().get("authtoken").toString());
        List<Loan> loanList = (List<Loan>) response.getBody().get("LoanList");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, loanList.size());
        assertEquals("L001", loanList.get(0).getLoanId());

    }

    @Test
    void applyLoan() {

        List<Loan> unavailedLoans = new ArrayList<>();
        unavailedLoans.add(loan);

        when(loanService.findUnavailedLoans(any(String.class), any(Boolean.class))).thenReturn(unavailedLoans);
        when(loanService.changeLoanStatus(any(String.class), any(Boolean.class))).thenReturn(1);
        when(itemService.changeItemStatus(any(String.class), any(Boolean.class))).thenReturn(1);
        when(issuedCardService.addCard(any(IssuedCard.class))).thenReturn(issuedCard);

        ResponseEntity<Map<String, Object>> empResponse = employeeController.addEmployee(emp);
        log.info( empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED, empResponse.getStatusCode());

        ResponseEntity<Map<String, Object>> response = employeeController.applyLoan(item, "Bearer " + empResponse.getBody().get("authtoken").toString());
        IssuedCard newCard = (IssuedCard) response.getBody().get("CardDetails");
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("L001", newCard.getLoanId());


    }

    @Test
    void viewItems(){

        List<IssuedCard> issuedCardList = new ArrayList<>();
        issuedCardList.add(issuedCard);
        when(issuedCardService.findIssuedCardByEmpId(any(Long.class))).thenReturn(issuedCardList);
        when(itemService.findItemByItemId(any(String.class))).thenReturn(item);

        ResponseEntity<Map<String, Object>> empResponse = employeeController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED, empResponse.getStatusCode());

        ResponseEntity<Map<String, Object>> response = employeeController.viewItems("Bearer " + empResponse.getBody().get("authtoken").toString());
        System.out.println(response.getBody());
        List<Item> itemList = (List<Item>) response.getBody().get("ItemList");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1,itemList.size());
        assertEquals("I001",itemList.get(0).getItemId());

    }

    @Test
    void listOfItems(){

        List<Item> itemList=new ArrayList<>();
        itemList.add(item);

        when(itemService.findItemByStatus(any(Boolean.class))).thenReturn(itemList);
        ResponseEntity<Map<String, Object>> empResponse = employeeController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED, empResponse.getStatusCode());

        ResponseEntity<Map<String, Object>> response = employeeController.listOfItems("Bearer " + empResponse.getBody().get("authtoken").toString());
        System.out.println(response.getBody());
        itemList = (List<Item>) response.getBody().get("LoanCards");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1,itemList.size());
        assertEquals("I001",itemList.get(0).getItemId());

    }



}