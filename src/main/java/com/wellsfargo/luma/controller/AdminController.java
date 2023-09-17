package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.service.EmployeeService;
import com.wellsfargo.luma.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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
                    return new ResponseEntity<>(map, HttpStatus.FORBIDDEN);
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
}
