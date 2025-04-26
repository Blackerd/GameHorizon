package org.example.backend.dto.request;

import lombok.Data;

@Data
public class CustomerUpdateRequestDTO {
    String name;
    String email;
    String phone;
}
