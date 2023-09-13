package com.wellsfargo.luma.repository;

import com.wellsfargo.luma.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
   Employee findByNameAndPassword(String name, String password);

}
