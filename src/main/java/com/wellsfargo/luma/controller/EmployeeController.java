package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.dto.LoginResponse;
import com.wellsfargo.luma.service.EmployeeService;
import com.wellsfargo.luma.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
            map.put("authtoken",jwtService.generateToken(authRequest.getUserName(),employee.get().getEmployeeId().toString()));
            map.put("success",true);
            return map;
        } else {
            log.info("Failed Authentication",authentication);
            throw new UsernameNotFoundException("invalid user request !");
        }


//        map.put("employee",employeeService.employeeLogin(authRequest));
//        return map;

    }

}
