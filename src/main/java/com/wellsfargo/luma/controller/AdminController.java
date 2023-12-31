package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.Item;
import com.wellsfargo.luma.model.Loan;
import com.wellsfargo.luma.service.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    public JwtService jwtService;

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    private LoanService loanService;

    @Autowired
    private ItemService itemService;

    @Autowired
    private DeleteEmployeeService deleteEmpService ;

    @PostMapping("/new")
    public ResponseEntity<Map<String, Object>>  addEmployee(@RequestBody Employee employee) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            //log.info(employee.toString());
            Employee newEmployee = employeeService.addEmployee(employee,"ADMIN");
            //log.info(newEmployee.getEmployeeId().toString());
            String token = jwtService.generateToken(employee.getName(), newEmployee.getEmployeeId().toString());
            map.put("authtoken", token);
            map.put("EmplyeeDetails", newEmployee);
            return new ResponseEntity<>(map,HttpStatus.CREATED);
        }catch (Exception e){
            log.info(e.getMessage());
            map.put("success" , false);
            map.put("Reason", "Error Adding Employee to DB");
            return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/auth")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(@RequestBody LoginRequest authRequest) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
            //log.info(authentication.toString());
            if (authentication.isAuthenticated()) {
                Optional<Employee> employee = employeeService.findByName(authRequest.getUserName());
                String role = employee.get().getRole();
                if (Objects.equals("ADMIN",role)) {
                    map.put("authtoken", jwtService.generateToken(authRequest.getUserName(), employee.get().getEmployeeId().toString()));
                    map.put("success", true);
                    map.put("EmployeeDetails",employee);
                    return new ResponseEntity<>(map, HttpStatus.OK);
                }
                else{
                    map.put("success", false);
                    map.put("Reason", "Not Authorized Admin");
                    return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
                }

            } else {
                map.put("success", false);
                map.put("Reason", "Invalid user request !");
                return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);
                //throw new UsernameNotFoundException("invalid user request !");
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
            //log.info("Testing");
            String name = jwtService.extractUsername(token);
            //if(name == null){name = "Ayush Paul";}
            //log.info(name);
            Optional<Employee> employee = employeeService.findByName(name);
            //log.info(employee.get().getName());
            if(Objects.equals("ADMIN",employee.get().getRole())){
                // Check that if theere is any loan card with the same loanId or not
                // if there is , then we just loanService.getLoanbyLoanId
                // we need to delete the already
                Loan oldLoan = loanService.findLoanByLoanId(loan.getLoanId());
                //log.info(oldLoan.toString());
                if(oldLoan == null)
                {
                    map.put("before adding", loan) ;
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
            log.info(e.getMessage());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }

    }

    @PutMapping("/editLoanCard/{id}")
    public ResponseEntity<Map<String,Object>> editLoan(@PathVariable(value = "id") String lId,
               @RequestBody Loan loan, @RequestHeader("Authorization") String authHeader){
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
                map.put("loan Id", lId) ;
                Loan oldLoan = loanService.findLoanByLoanId(lId);
                map.put("loan", oldLoan) ;
                if(oldLoan == null){
                    map.put("Loan Id incorrect", false) ;
                    return new ResponseEntity<>(map, HttpStatus.NOT_FOUND) ;
                }
                else {
                    if (oldLoan.getStatus().equals(false)){
                        loan.setId(oldLoan.getId()) ;
                        loan.setLoanId(oldLoan.getLoanId());
                        Loan newLoan = loanService.addLoanCard(loan);
                        map.put("LoanDetails",newLoan);
                        map.put("Success",true);
                        return new ResponseEntity<>(map,HttpStatus.CREATED);
                    }
                    else {
                        map.put("cannot do it, loan is being utilised by an employee", false) ;
                        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST) ;
                    }
                }
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

    @DeleteMapping("/deleteLoanCard/{id}")
    public ResponseEntity<Map<String,Object>> deleteLoan(@PathVariable(value = "id") String lId,
                                            @RequestHeader("Authorization") String authHeader){
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
                Loan oldLoan = loanService.findLoanByLoanId(lId);
                if(oldLoan == null){
                    map.put("Loan Id incorrect", false) ;
                    return new ResponseEntity<>(map, HttpStatus.NOT_FOUND) ;
                }
                else {
                    //what is the status of the object here
                    if (oldLoan.getStatus().equals(false)){
                        loanService.deleteById(oldLoan.getId()) ;
                        map.put("Data deleted", true) ;
                        return new ResponseEntity<>(map, HttpStatus.OK) ;
                    }
                    else {
                        map.put("Loan in use, cannot delete", false);
                        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
                    }
                }
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
            //log.info(authHeader);
            String token = authHeader.substring(7);
            //log.info(token);
            if(token == null)
            {
                map.put("success" , false);
                map.put("message","Error Fetching User. No User Found");
                return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
            }


            String name = jwtService.extractUsername(token);
            //log.info(name);
            Optional<Employee> employee = employeeService.findByName(name);
            //log.info(employee.get().getName());
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

    @GetMapping("/viewUsers")
    public ResponseEntity<Map<String,Object>> viewUsers(@RequestHeader("Authorization") String authHeader){
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
                List<Employee>employeeList=employeeService.findAll();
                map.put("Success",true);
                map.put("EmployeeList",employeeList);
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

    @PostMapping("/addItem")
    public ResponseEntity<Map<String,Object>> addItem(@RequestBody Item item, @RequestHeader("Authorization") String authHeader){
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

                Item oldItem = itemService.findItemByItemId(item.getItemId());
                if(oldItem == null)
                {

                    Item newItem = itemService.addItem(item);
                    map.put("ItemDetails",newItem);
                    map.put("Success",true);

                    return new ResponseEntity<>(map,HttpStatus.CREATED);
                }
                map.put("Reason", "Item ID exists already")    ;
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

    @PutMapping("/editItem/{id}")
    public ResponseEntity<Map<String,Object>> editItem(@PathVariable(value = "id") String tId, @RequestBody Item item, @RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>();
        //log.info("hello");
        try {
            String token = authHeader.substring(7);
            if(token == null)
            {
                map.put("success" , false);
                map.put("message","Error Fetching User. No User Found");
                return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            map.put("im here", false) ;
            Optional<Employee> employee = employeeService.findByName(name);
            if(Objects.equals("ADMIN",employee.get().getRole())){

                map.put("Item Id", tId) ;
                Item oldItem = itemService.findItemByItemId(item.getItemId());
                if(oldItem == null)
                {
                    map.put("Item id incorrect",false) ;
                    return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
                }
                else {
                    if (oldItem.getStatus().equals(false)){
                        item.setId(oldItem.getId());
                        Item newItem = itemService.addItem(item) ;
                        map.put("Item details", newItem) ;
                        map.put("Success", true) ;
                        return new ResponseEntity<>(map, HttpStatus.CREATED) ;
                    }
                    else {
                        map.put("cannot do it item is being availed by a user", false) ;
                        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST) ;
                    }
                }
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

    @DeleteMapping("/deleteItem/{id}")
    public ResponseEntity<Map<String,Object>> deleteItem(@PathVariable(value = "id") String tId, @RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>();
        //log.info("hello");
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

                map.put("Item Id", tId) ;
                Item oldItem = itemService.findItemByItemId(tId);
                if(oldItem == null)
                {
                    map.put("Item id incorrect",false) ;
                    return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
                }
                else {
                    if (oldItem.getStatus().equals(false)){
                        itemService.deleteById(oldItem.getId());
                        map.put("Data deleted", true) ;
                        return new ResponseEntity<>(map, HttpStatus.CREATED) ;
                    }
                    else {
                        map.put("cannot do it item is being availed by a user", false) ;
                        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST) ;
                    }
                }
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
            if(Objects.equals("ADMIN",employee.get().getRole())){
                List<Item> itemList = itemService.getItems();
                map.put("Success",true);
                map.put("ItemList",itemList);
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

    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable(value = "id") Long eId,
                                                          @RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>() ;

        try {
            String token = authHeader.substring(7);
            if (token == null) {
                map.put("success", false);
                map.put("message", "Error fetching user. No user found");
                return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            Optional<Employee> employee = employeeService.findByName(name);

            if (Objects.equals("ADMIN", employee.get().getRole())) {
                Optional<Employee> oldEmp = employeeService.findById(eId);

                if (oldEmp.isPresent()) {
                    employeeService.deleteById(eId);
                    deleteEmpService.deleteIssueCards(eId);
                    map.put("deleted", true) ;
                    return new ResponseEntity<>(map, HttpStatus.OK) ;
                } else {
                    map.put("Employee Id doesn't exist", false);
                    return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
                }
            } else {
                map.put("success", false) ;
                map.put("You are not authorized", false);
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e){
            log.info(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }
    }

    @PutMapping("/editEmployee/{id}")
    public ResponseEntity<Map<String, Object>> editUser(@PathVariable(value = "id") Long eId,
                                                        @RequestBody Employee newEmp, @RequestHeader("Authorization") String authHeader){
        Map<String, Object> map = new HashMap<String, Object>() ;

        try {
            String token = authHeader.substring(7);
            if (token == null) {
                map.put("success", false);
                map.put("message", "Error fetching user. No user found");
                return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
            }
            String name = jwtService.extractUsername(token);
            Optional<Employee> employee = employeeService.findByName(name);


            //log.info( newEmp.getDesignation());
            //log.info( newEmp.getRole());
            //log.info(newEmp.getDepartment());

            if (Objects.equals("ADMIN", employee.get().getRole())) {

                Optional<Employee> oldEmp = employeeService.findById(eId);

                if (oldEmp.isPresent()) {
                    map.put("new emmp at the begin", newEmp) ;
                    if (newEmp.getPassword() == null){
                        newEmp.setPassword(oldEmp.get().getPassword());
                    }
                    if (newEmp.getName() == null){
                        newEmp.setName(oldEmp.get().getName());
                    }
                    if(newEmp.getDesignation() == null){
                        newEmp.setDesignation(oldEmp.get().getDesignation());
                    }
                    if(newEmp.getDepartment() == null){
                        newEmp.setDepartment(oldEmp.get().getDepartment());
                    }
                    if(newEmp.getGender() == '\0'){
                        newEmp.setGender(oldEmp.get().getGender());
                    }
                    if (newEmp.getDob() == null){
                        newEmp.setDob(oldEmp.get().getDob());
                    }
                    if (newEmp.getDoj() == null){
                        newEmp.setDoj(oldEmp.get().getDoj());
                    }
                    if (newEmp.getRole() == null){
                        newEmp.setRole(oldEmp.get().getRole());
                    }
                    newEmp.setEmployeeId(oldEmp.get().getEmployeeId());

                    map.put("new emmp at the end", newEmp) ;
                    Employee emp = employeeService.addEmployee(newEmp, "EMP") ;
                    map.put("employee", emp) ;
                    map.put("success", true) ;
                    return new ResponseEntity<>(map, HttpStatus.OK) ;
                } else {
                    map.put("Employee Id doesn't exist", false);
                    return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
                }
            } else {
                map.put("success", false) ;
                map.put("You are not authorized", false);
                return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e){
            log.warn("ERROR IS BELOW");
            e.printStackTrace();
//            log.error(e.getStackTrace().toString());
            map.put("success",false);
            map.put("Reason","Check Credentials");
            return ResponseEntity.internalServerError().body(map);
        }
    }


}
