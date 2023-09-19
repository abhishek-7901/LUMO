package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.dto.LoginResponse;
import com.wellsfargo.luma.model.IssuedCard;
import com.wellsfargo.luma.model.Item;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins="http://localhost:3000")
@Slf4j
public class EmployeeController {


    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LoanService loanService;

    @Autowired
    private ItemService itemService;

    @Autowired
    private IssuedCardService issuedCardService;

    @PostMapping("/new")
    public Map<String,Object> addEmployee(@RequestBody Employee employee){
        Map<String, Object> map = new HashMap<String, Object>();
        Employee newEmployee = employeeService.addEmployee(employee,"EMP");
        String token = jwtService.generateToken(employee.getName(),employee.getEmployeeId().toString());
        map.put("authtoken",token);
        map.put("EmplyeeDetails",newEmployee);
        return map;
    }

//    @PostMapping("/login")
//    public LoginResponse employeeLogin(@RequestBody LoginRequest loginRequest){
//        return employeeService.employeeLogin(loginRequest);
//    }

    @PostMapping("/auth")
    public Map<String, Object> authenticateAndGetToken(@RequestBody LoginRequest authRequest) {
        log.info(authRequest.getPassword());
        Map<String, Object> map = new HashMap<String, Object>();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
        log.info(authentication.toString());
        if (authentication.isAuthenticated()) {
            Optional<Employee> employee = employeeService.findByName(authRequest.getUserName());
            log.info(employee.get().getName());
            map.put("EmployeeDetails",employee);
            map.put("authtoken",jwtService.generateToken(authRequest.getUserName(),employee.get().getEmployeeId().toString()));
            map.put("success",true);
            return map;
        } else {
            map.put("success", false);
            map.put("Reason", "Invalid user request !");
            return map;
        }


//        map.put("employee",employeeService.employeeLogin(authRequest));
//        return map;

    }

    @PostMapping("/applyLoan")
    public ResponseEntity<Map<String,Object>> addItem(@RequestBody Item item, @RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String token = authHeader.substring(7);
            if(token == null)
            {
                map.put("success" , false);
                map.put("message","Error Fetching User. No User Found");
                return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            Optional<Employee> employee = employeeService.findByName(name);
            if(Objects.equals("EMP",employee.get().getRole())){

                // Find a Loan Card which have the same type as the type of requested Item and is also not availed , i.e, status == false
                // Mark both the Item and Loan as Availed, i.e , change the status of both to true;
                // Make a new entry in the relation table
                List<Loan> unavailedLoans = loanService.findUnavailedLoans(item.getCategory(),false);

                if(unavailedLoans.isEmpty()){
                    map.put("success" , false);
                    map.put("Reason","No Unavailed Loan Cards Found");

                    return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);
                }
                int markLoanAvailed = loanService.changeLoanStatus(unavailedLoans.get(0).getLoanId(),true);

                if(markLoanAvailed<=0){
                    map.put("success" , false);
                    map.put("Reason","Error Changing Loan Status");

                    return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);
                }

                int markItemAvailed = itemService.changeItemStatus(item.getItemId(),true);

                if(markItemAvailed<=0){
                    map.put("success" , false);
                    map.put("Reason","Error Changing Item Status");

                    return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);
                }
                IssuedCard issuedCard = new IssuedCard();
                issuedCard.setEmpId(employee.get().getEmployeeId());
                issuedCard.setItemId(item.getItemId());
                issuedCard.setLoanId(unavailedLoans.get(0).getLoanId());
                IssuedCard newCard = issuedCardService.addCard(issuedCard);

                map.put("success",true);
                map.put("CardDetails",newCard);

                return new ResponseEntity<>(map,HttpStatus.CREATED);

            }
            else {
                map.put("success", false);
                map.put("Reason", "Not Authorized USER");
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }

    @GetMapping("/viewLoans")
    public ResponseEntity<Map<String,Object>> viewLoanCards(@RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String token = authHeader.substring(7);
            if(token == null)
            {
                map.put("success" , false);
                map.put("message","Error Fetching User. No User Found");
                return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            Optional<Employee> employee = employeeService.findByName(name);
            if(Objects.equals("EMP",employee.get().getRole())){

                List<IssuedCard> issuedCardList = issuedCardService.findIssuedCardByEmpId(employee.get().getEmployeeId());
                List<Loan> loanList = new ArrayList<>();
                issuedCardList.forEach((card)->{
                    Loan loan = loanService.findLoanByLoanId(card.getLoanId());
                    loanList.add(loan);
                });
                map.put("LoanList",loanList);
                map.put("Success",true);

                return new ResponseEntity<>(map,HttpStatus.OK);
            }
            else {
                map.put("success", false);
                map.put("Reason", "Not Authorized.");
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }

    @GetMapping("/viewItems")
    public ResponseEntity<Map<String,Object>> viewItems(@RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String token = authHeader.substring(7);
            if(token == null)
            {
                map.put("success" , false);
                map.put("message","Error Fetching User. No User Found");
                return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            Optional<Employee> employee = employeeService.findByName(name);
            if(Objects.equals("EMP",employee.get().getRole())){

                List<IssuedCard> issuedCardList = issuedCardService.findIssuedCardByEmpId(employee.get().getEmployeeId());
                List<Item> itemList = new ArrayList<>();
                issuedCardList.forEach((card)->{
                    Item item = itemService.findItemByItemId(card.getItemId());
                    itemList.add(item);
                });
                map.put("ItemList",itemList);
                map.put("Success",true);

                return new ResponseEntity<>(map,HttpStatus.OK);
            }
            else {
                map.put("success", false);
                map.put("Reason", "Not Authorized.");
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }

    @GetMapping("/listOfItems")
    public ResponseEntity<Map<String,Object>> listOfItems(@RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String token = authHeader.substring(7);
            if(token == null)
            {
                map.put("success" , false);
                map.put("message","Error Fetching User. No User Found");
                return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            Optional<Employee> employee = employeeService.findByName(name);
            if(Objects.equals("EMP",employee.get().getRole())){

                List<Item> itemList = itemService.findItemByStatus(false);
                map.put("Success",true);
                map.put("LoanCards",itemList);
                return new ResponseEntity<>(map,HttpStatus.OK);
            }
            else {
                map.put("success", false);
                map.put("Reason", "Not Authorized.");
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }




}
