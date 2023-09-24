package com.wellsfargo.luma.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.repository.EmployeeRepository;
import com.wellsfargo.luma.repository.LoanRepository;
import com.wellsfargo.luma.service.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;


import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@ExtendWith(MockitoExtension.class)
//
//@AutoConfigureMockMvc
@Slf4j
//@WebMvcTest(AdminController.class)
@SpringBootTest
class AdminControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @Mock
//    ObjectMapper mapper;

    @Autowired
    AdminController adminController;

//    @Mock
//    EmployeeRepository employeeRepository;
//    @Mock
//    LoanRepository loanRepository;

    //@Mock
//    @MockBean
//    private AuthenticationManager authenticationManager;
//    //@InjectMocks
    @MockBean
    private JwtService jwtService;
    @MockBean
    private LoanService loanService;
    @MockBean
    private ItemService itemService;
    @MockBean
    private EmployeeService employeeService;
//
//    @MockBean
//    private EmployeeDetailsService employeeDetailsService;
//
    @InjectMocks
    private JwtService jwtService1;

//    @Autowired
//    private EmployeeService employeeService1;

    @MockBean
    public PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private WebApplicationContext webApplicationContext;



    public static Employee emp;
    public String token;

    public Loan loan;


    @BeforeEach
    public void setup(){
        emp = new Employee();
        emp.setPassword("secret123");
        emp.setName("Ayush Paul");
        emp.setRole("ADMIN");
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

        when(employeeService.addEmployee(any(Employee.class),any(String.class))).thenReturn(emp);
        when(employeeService.findByName(any(String.class))).thenReturn(Optional.of(emp));

        token =jwtService1.generateToken(emp.getName(),emp.getPassword());
        when(jwtService.generateToken(any(String.class),any(String.class))).thenReturn(jwtService1.generateToken(emp.getName(),emp.getPassword()));
        when(jwtService.extractUsername(any(String.class))).thenReturn(emp.getName());

    }

    @AfterEach
    void cleanUp(){
        emp=null;
        loan=null;
    }


//    @BeforeAll
//    public static void setUp() {
////        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
//        Employee emp = Employee.builder()
//                .name("Ayush")
//                .dob(new Date())
//                .doj(new Date())
//                .department("TCOO")
//                .designation("Program Associate")
//                .gender('M')
//                .password("secret123")
//                .role("ADMIN")
//                .build();
//
//        admin = emp;
//
//    }
//
//    @BeforeEach
//    void setupBeforeEachTest(){
//
//        try {
//            employeeRepository.save(admin);
//            log.info(admin.getName());
//            //Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(admin.getName(),admin.getPassword()));
//            token =jwtService1.generateToken(admin.getName(),admin.getPassword());
//            log.info(token);
////            if (authentication.isAuthenticated()) {
////
////                if (Objects.equals("ADMIN",admin.getRole())) {
////                    //token = "";
////                    token =jwtService.generateToken(admin.getName(),admin.getPassword());
////                    //map.put("authtoken", jwtService.generateToken(authRequest.getUserName(), employee.get().getEmployeeId().toString()));
////                    //map.put("success", true);
////                    //map.put("EmployeeDetails",employee);
////                    //return new ResponseEntity<>(map, HttpStatus.OK);
////                }
////                else{
////                    //map.put("success", false);
////                    //map.put("Reason", "Not Authorized Admin");
////                    throw new UsernameNotFoundException("Not Authorized Admin");
////                }
////
////            }
//        }catch (Exception e){
//
//            throw e;
//            //map.put("success",false);
//            //map.put("Reason","Check Credentials");
//
//        }
//    }
//
//    @Test
//    void addLoanCard() {
//        try {
//            token =jwtService1.generateToken(admin.getName(),admin.getPassword());
//            log.info(token);
//            if(token == null)
//            {
////                map.put("success" , false);
////                map.put("message","Error Fetching User. No User Found");
//                throw new RuntimeException("Token IS NULL");
//            }
//
//            //Optional<Employee> employee = employeeService.findByName(name);
//            if(Objects.equals("ADMIN",admin.getRole())){
//                // Check that if theere is any loan card with the same loanId or not
//                // if there is , then we just loanService.getLoanbyLoanId
//                // we need to delete the already
//                Loan loan = Loan.builder()
//                        .loanId("L001")
//                        .duration(3)
//                        .type("Furniture")
//                        .status(false)
//                        .build();
//                Mockito.when(loanRepository.save(loan)).thenReturn(loan);
//                ObjectMapper mapper = new ObjectMapper();
//                MockHttpServletRequestBuilder mockRequest = get("http://localhost:9191/admin/viewLoanCards")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//                        //.content(mapper.writeValueAsString(loan))
//                        .header("Authorization","Bearer "+token);
//                //MockMvc mockMvc1 = new MockMvc();
//                //mockMvc = MockMvcBuilders.standaloneSetup(new AdminControllerTest()).build();
//                mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//                mockMvc.perform(mockRequest)
//                       .andExpect(status().isOk());
//                        //.andExpect(jsonPath("$", notNullValue()))
//                        //.andExpect(jsonPath("$.loanId").value("L001"));
//
////                mockMvc.perform(MockMvcRequestBuilders.post("http://localhost:9191/admin/addLoanCard")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .accept(MediaType.APPLICATION_JSON)
////                        .content(mapper.writeValueAsString(loan))
////                        .header("Authorization","Bearer "+token))
////                        .andExpect(jsonPath("$", notNullValue()))
////                        .andExpect(jsonPath("$.duration").value("L001"));
//
//                //mockMvc.perform(post("/admin/addLoanCard")).andExpect(jsonPath("$", notNullValue()));
//
//
//
//            }
//            else {
////                map.put("success", false);
////                map.put("Reason", "Not Authorized Admin");
//                throw new RuntimeException("Not Authorized Admin");
//            }
//        }catch (Exception e){
//
////            map.put("success",false);
////            map.put("Reason","Check Credentials");
//            throw new RuntimeException(e);
//        }
//    }


    @Test
    void addLoanCard(){
        // Create an ArgumentCaptor to capture the Employee.class parameter
//        ArgumentCaptor<String> userNameCaptor = ArgumentCaptor.forClass(String.class);
//        ArgumentCaptor<String> passwordCaptor = ArgumentCaptor.forClass(String.class);
        // Specify behavior for the mock

//        Employee emp = new Employee();
//        emp.setPassword("secret123");
//        emp.setName("Ayush Paul");
//        emp.setRole("ADMIN");
//        emp.setDob(new Date());
//        emp.setDepartment("TCOO");
//        emp.setDoj(new Date());
//        emp.setDesignation("Program Associate");
//        emp.setEmployeeId(1L);
//        Loan loan = Loan.builder()
//                        .loanId("L001")
//                        .duration(3)
//                        .type("Furniture")
//                        .status(false)
//                        .id(1L)
//                        .build();

        //Employee newEmp = employeeService1.addEmployee(emp,"ADMIN");
        //log.info(newEmp.getName());
        //token =jwtService1.generateToken(emp.getName(),emp.getPassword());



//        when(jwtService.generateToken(userNameCaptor.capture(),passwordCaptor.capture())).thenAnswer(invocationOnMock -> {
//            Object[] args = invocationOnMock.getArguments();
//            log.info(args.toString());
//            String str = (String) args[0];
//            return str;
//        });
//        when(jwtService.extractUsername(userNameCaptor.capture())).thenAnswer(invocationOnMock -> {
//            Object[] args = invocationOnMock.getArguments();
//            log.info(args.toString());
//            String str = (String) args[0];
//            return str;
//        });

        when(loanService.findLoanByLoanId(any(String.class))).thenReturn(null);
        when(loanService.addLoanCard(any(Loan.class))).thenReturn(loan);
        //ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());

        //log.info(passwordEncoder.encode(emp.getPassword()));
        //token =jwtService1.generateToken(emp.getName(),emp.getPassword());
        log.info(empResponse.getBody().get("authtoken").toString());

        ResponseEntity<Map<String,Object>> response = adminController.addLoanCard(loan,"Bearer "+empResponse.getBody().get("authtoken").toString());
        Loan newLoan = (Loan) response.getBody().get("LoanDetails");

        assertEquals(HttpStatus.CREATED,response.getStatusCode());
        assertNotNull(response.getBody().get("LoanDetails"));
        assertEquals("L001",newLoan.getLoanId());
    }

    @Test
    void editLoanCard(){

        when(loanService.findLoanByLoanId(any(String.class))).thenReturn(loan);
        when(loanService.addLoanCard(any(Loan.class))).thenReturn(loan);

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());

        loan.setType("Grocery");

        ResponseEntity<Map<String,Object>> response = adminController.editLoan(loan.getLoanId(),loan,"Bearer "+empResponse.getBody().get("authtoken").toString());
        Loan newLoan = (Loan) response.getBody().get("LoanDetails");

        assertEquals(HttpStatus.CREATED,response.getStatusCode());
        assertNotNull(response.getBody().get("LoanDetails"));

        assertEquals("Grocery",newLoan.getType());

    }

    @Test
    void deleteLoanCard(){

        when(loanService.findLoanByLoanId(any(String.class))).thenReturn(loan);
        doNothing().when(loanService).deleteById(any(Long.class));

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());


        ResponseEntity<Map<String,Object>> response = adminController.deleteLoan(loan.getLoanId(),"Bearer "+empResponse.getBody().get("authtoken").toString());

        assertEquals(HttpStatus.OK,response.getStatusCode());




    }
}