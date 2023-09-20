package com.wellsfargo.luma.service;

import com.wellsfargo.luma.model.Employee;
import com.wellsfargo.luma.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.List;
import java.util.Optional;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
@Slf4j
class EmployeeServiceTest {

    @InjectMocks
    private EmployeeService employeeService;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private Employee emp;

    @BeforeEach()
    void setup(){
         emp = Employee.builder()
                .name("Ayush")
                .dob(new Date())
                .doj(new Date())
                .department("TCOO")
                .designation("Program Associate")
                .gender('M')
                .password("secret123")
                .role("ADMIN")
                .build();
    }

    @Test
    void should_save_one_employee(){

        Employee emp = Employee.builder()
                .name("Ayush")
                .dob(new Date())
                .doj(new Date())
                .department("TCOO")
                .designation("Program Associate")
                .gender('M')
                .password("secret123")
                .role("ADMIN")
                .build();
        when(employeeRepository.save(any(Employee.class))).thenReturn(emp);

        Employee saveEmployee = employeeService.addEmployee(emp,"ADMIN");

        assertThat(saveEmployee).usingRecursiveComparison().isEqualTo(emp);
//        verify(employeeRepository,times(1)).save(any(Employee.class));
//        verifyNoMoreInteractions(employeeRepository);
    }

    @Test
    void get_all_employees(){
//        Page<Employee> employees = Mockito.mock(Page.class);
//        when(employeeRepository.findAll(Mockito.any(Pageable.class))).thenReturn(employees);
        Employee emp1 = Employee.builder()
                .name("Prabhat")
                .dob(new Date())
                .doj(new Date())
                .department("TCOO")
                .designation("Program Associate")
                .gender('M')
                .password("secret123")
                .role("ADMIN")
                .build();
        given(employeeRepository.findAll()).willReturn(List.of(emp,emp1));
        List<Employee> employeeList = employeeService.findAll();
        //log.info(employeeList.toString());
        assertThat(employeeList).isNotNull();
        assertThat(employeeList.size()).isEqualTo(2);
    }

    @Test
    void get_employee_by_name(){
        given(employeeRepository.findByName("Ayush")).willReturn(Optional.of(emp));

        Employee savedEmployee = employeeService.findByName(emp.getName()).get();
        log.info(savedEmployee.toString());
        assertThat(savedEmployee).isNotNull();
    }



}