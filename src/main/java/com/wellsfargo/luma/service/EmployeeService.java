package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.dto.LoginRequest;
import com.wellsfargo.luma.repository.EmployeeRepository;
import com.wellsfargo.luma.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Employee addEmployee(Employee employee, String role){
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setRole(role);
        return  employeeRepository.save(employee);
    }

    public LoginResponse employeeLogin(LoginRequest loginRequest) {

         Employee employee = employeeRepository.findByNameAndPassword(
                 loginRequest.getUserName(),loginRequest.getPassword());
         if ( employee!=null)
            {
                return new LoginResponse(true, loginRequest.getUserName());
            }
        return new LoginResponse(false,"");
    }

    public Optional<Employee> findByName(String username){
        return employeeRepository.findByName(username);
    }
}
