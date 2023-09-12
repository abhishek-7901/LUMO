package com.wellsfargo.luma.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employee_id;

    private String employee_name;

    private String designation;

    private String department;

    private char gender;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date doj;


}
