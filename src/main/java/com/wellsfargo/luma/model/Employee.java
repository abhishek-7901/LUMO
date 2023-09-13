package com.wellsfargo.luma.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @Column(nullable=false)
    private String password;

    @Column(nullable=false)
    private String name;

    private String designation;

    private String department;

    private char gender;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date doj;


}
