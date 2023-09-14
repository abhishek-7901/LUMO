package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.dto.LoginResponse;
import com.wellsfargo.luma.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;



    @PostMapping("/new")
    public Map<String,Object> addEmployee(@RequestBody Employee employee){
        Map<String, Object> map = new HashMap<String, Object>();
        Employee newEmployee = employeeService.addEmployee(employee);
        map.put("EmplyeeDetails",newEmployee);
        return map;
    }

    @PostMapping("/login")
    public LoginResponse employeeLogin(@RequestBody LoginRequest loginRequest){
        return employeeService.employeeLogin(loginRequest);
    }

    }
