package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.Item;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.service.EmployeeService;
import com.wellsfargo.luma.service.ItemService;
import com.wellsfargo.luma.service.JwtService;
import com.wellsfargo.luma.service.LoanService;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

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

    public Item item;


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

        item = new Item();
        item.setStatus(false);
        item.setId(1L);
        item.setItemId("I001");
        item.setMake("Wood");
        item.setCategory("Furniture");
        item.setValue(5000L);
        item.setDescription("Diner Table");

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
        item = null;
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

    @Test
    void viewLoanCards(){

        Loan loan1 = Loan.builder()
                .loanId("L002")
                .duration(4)
                .type("Grocery")
                .status(false)
                .id(2L)
                .build();

        List<Loan> loanList = new ArrayList<Loan>();

        loanList.add(loan);
        loanList.add(loan1);

        when(loanService.getLoanCards()).thenReturn(loanList);

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());

        ResponseEntity<Map<String,Object>> response = adminController.viewLoanCards("Bearer "+empResponse.getBody().get("authtoken").toString());
        List<Loan> loans = (List<Loan>) response.getBody().get("LoanCards");
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(2,loans.size());
        assertEquals("L001",loans.get(0).getLoanId());
        assertEquals("L002",loans.get(1).getLoanId());

    }

    @Test
    void viewUsers(){

        Employee emp1 = new Employee();
        emp1.setPassword("secret123");
        emp1.setName("Prabhat");
        emp1.setRole("USER");
        emp1.setDob(new Date());
        emp1.setDepartment("TCOO");
        emp1.setDoj(new Date());
        emp1.setDesignation("Program Associate");
        emp1.setEmployeeId(2L);

        List<Employee> employeeList = new ArrayList<Employee>();

        employeeList.add(emp);
        employeeList.add(emp1);

        when(employeeService.findAll()).thenReturn(employeeList);

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());

        ResponseEntity<Map<String,Object>> response = adminController.viewUsers("Bearer "+empResponse.getBody().get("authtoken").toString());
        List<Employee> employees = (List<Employee>) response.getBody().get("EmployeeList");
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(2,employees.size());
        assertEquals(1L, employees.get(0).getEmployeeId());
        assertEquals(2L, employees.get(1).getEmployeeId());

    }

    @Test
    void addItem(){

        when(itemService.findItemByItemId(any(String.class))).thenReturn(null);
        when(itemService.addItem(any(Item.class))).thenReturn(item);

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());

        ResponseEntity<Map<String,Object>> response = adminController.addItem(item,"Bearer "+empResponse.getBody().get("authtoken").toString());
        Item newItem = (Item) response.getBody().get("ItemDetails");

        assertEquals(HttpStatus.CREATED,response.getStatusCode());
        assertNotNull(response.getBody().get("ItemDetails"));

        assertEquals("I001",newItem.getItemId());

    }

    @Test
    void editItem(){
        when(itemService.findItemByItemId(any(String.class))).thenReturn(item);
        when(itemService.addItem(any(Item.class))).thenReturn(item);

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());

        item.setCategory("Grocery");

        ResponseEntity<Map<String,Object>> response = adminController.editItem(item.getItemId(),item,"Bearer "+empResponse.getBody().get("authtoken").toString());
        Item newItem = (Item) response.getBody().get("Item details");

        assertEquals(HttpStatus.CREATED,response.getStatusCode());
        assertNotNull(response.getBody().get("Item details"));

        assertEquals("Grocery",newItem.getCategory());

    }

    @Test
    void deleteItem(){
        when(itemService.findItemByItemId(any(String.class))).thenReturn(item);
        doNothing().when(itemService).deleteById(any(Long.class));

        ResponseEntity<Map<String, Object>> empResponse = adminController.addEmployee(emp);
        log.info(empResponse.getBody().toString());
        assertEquals(HttpStatus.CREATED,empResponse.getStatusCode());


        ResponseEntity<Map<String,Object>> response = adminController.deleteItem(item.getItemId(),"Bearer "+empResponse.getBody().get("authtoken").toString());


        assertEquals(HttpStatus.CREATED,response.getStatusCode());

    }



}