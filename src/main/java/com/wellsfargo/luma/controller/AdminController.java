package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.service.EmployeeService;
import com.wellsfargo.luma.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
    public Map<String,Object> addEmployee(@RequestBody Employee employee){
        Map<String, Object> map = new HashMap<String, Object>();
        Employee newEmployee = employeeService.addEmployee(employee,"ADMIN");
        String token = jwtService.generateToken(employee.getName(),employee.getEmployeeId().toString());
        map.put("authtoken",token);
        map.put("EmplyeeDetails",newEmployee);
        return map;
    }

}
