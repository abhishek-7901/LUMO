package com.wellsfargo.luma.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    //notnull

    private Long employeeId;

    private String password;

}
