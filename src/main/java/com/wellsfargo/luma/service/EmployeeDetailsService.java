package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EmployeeDetailsService implements UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> employee = employeeRepository.findByName(username);

        return employee.map(EmployeeDetails::new).orElseThrow(()-> new UsernameNotFoundException("User Not Found"+username));
    }
}
