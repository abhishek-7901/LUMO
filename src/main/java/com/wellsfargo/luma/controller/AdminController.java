package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.service.EmployeeService;
import com.wellsfargo.luma.service.JwtService;
import com.wellsfargo.luma.service.LoanService;
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
@RequestMapping("/admin")
@CrossOrigin(origins="http://localhost:3000")
@Slf4j
public class AdminController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LoanService loanService;

    @PostMapping("/new")
    public Map<String, Object> addEmployee(@RequestBody Employee employee) {
        Map<String, Object> map = new HashMap<String, Object>();
        Employee newEmployee = employeeService.addEmployee(employee, "ADMIN");
        String token = jwtService.generateToken(employee.getName(), employee.getEmployeeId().toString());
        map.put("authtoken", token);
        map.put("EmplyeeDetails", newEmployee);
        return map;
    }

    @PostMapping("/auth")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(@RequestBody LoginRequest authRequest) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
            log.info(authentication.toString());
            if (authentication.isAuthenticated()) {
                Optional<Employee> employee = employeeService.findByName(authRequest.getUserName());
                String role = employee.get().getRole();
                if (Objects.equals("ADMIN",role)) {
                    map.put("authtoken", jwtService.generateToken(authRequest.getUserName(), employee.get().getEmployeeId().toString()));
                    map.put("success", true);
                    return new ResponseEntity<>(map, HttpStatus.OK);
                }
                else{
                    map.put("success", false);
                    map.put("Reason", "Not Authorized Admin");
                    return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
                }

            } else {
                throw new UsernameNotFoundException("invalid user request !");
            }
        }catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }
    @PostMapping("/addLoanCard")
    public ResponseEntity<Map<String,Object>> addLoanCard(@RequestBody Loan loan, @RequestHeader("Authorization") String authHeader){
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
            if(Objects.equals("ADMIN",employee.get().getRole())){
                Loan oldLoan = loanService.findLoanByLoanId(loan.getLoanId());
                if(oldLoan == null)
                {
                    Loan newLoan = loanService.addLoanCard(loan);
                    map.put("LoanDetails",newLoan);
                    map.put("Success",true);

                    return new ResponseEntity<>(map,HttpStatus.CREATED);
                }

                map.put("Success",false);

                return new ResponseEntity<>(map,HttpStatus.CONFLICT);
            }
            else {
                map.put("success", false);
                map.put("Reason", "Not Authorized Admin");
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }

    @GetMapping("/viewLoanCards")
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
            if(Objects.equals("ADMIN",employee.get().getRole())){
                List<Loan> loanList = loanService.getLoanCards();
                map.put("Success",true);
                map.put("LoanCards",loanList);
                return new ResponseEntity<>(map,HttpStatus.OK);
            }
            else {
                map.put("success", false);
                map.put("Reason", "Not Authorized Admin");
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
