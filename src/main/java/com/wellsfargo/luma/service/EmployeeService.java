package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.LoginRequest;
import com.wellsfargo.luma.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee){

        return  employeeRepository.save(employee);
    }

    public String employeeLogin(LoginRequest loginRequest) {
        try {
            Employee employee = employeeRepository.getReferenceById(loginRequest.getEmployeeId());
            if (employee.getPassword().equals(loginRequest.getPassword()))
                return "Login Successful";

        } catch (Exception e) {
            return "Unable to login";
        }

        return "Check credentials";
    }
}
