package org.example.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Data
public class CustomerRequestDTO implements Serializable {

    @NotNull(message = "Fullname không được để trống ")
    private String fullname;
    @NotNull(message = "Username không được để trống ")
    private String username;

    @NotNull(message = "Email không được để trống ")
    @Email(message = "email không hợp lệ")
    private String email;

    @NotNull(message = "password không được để trống ")
    private String password;

    @NotNull(message = "Phone không được để trống ")
    private String phone;

}
