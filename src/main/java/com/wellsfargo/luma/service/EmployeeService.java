package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.model.LoginRequest;
import com.wellsfargo.luma.repository.EmployeeRepository;
import com.wellsfargo.luma.response.LoginResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee){

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
}
