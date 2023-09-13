package com.wellsfargo.luma.controller;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.LoginRequest;
import com.wellsfargo.luma.repository.EmployeeRepository;
import com.wellsfargo.luma.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
public class EmployeeController {


    private final EmployeeService employeeService;


    @PostMapping("/new")
    public Map<String,Object> addEmployee(@RequestBody Employee employee){
        Map<String, Object> map = new HashMap<String, Object>();
        Employee newEmployee = employeeService.addEmployee(employee);
        map.put("EmplyeeDetails",newEmployee);
        return map;
    }

    @PostMapping("/login")
    public String employeeLogin(@RequestBody LoginRequest loginRequest){
        return employeeService.employeeLogin(loginRequest);

    }

    }
