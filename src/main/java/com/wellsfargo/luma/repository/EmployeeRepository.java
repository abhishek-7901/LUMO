package com.wellsfargo.luma.repository;

import com.wellsfargo.luma.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
   Employee findByNameAndPassword(String name, String password);

   Optional<Employee> findByName(String username);

   public List<Employee>findAll();
}
