package com.wellsfargo.luma.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssuedCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long issueId;

    private String loanId;

    private String itemId;

    private Long empId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee ;

    @JsonBackReference
    public Employee getEmployee(){
        return employee ;
    }



}
