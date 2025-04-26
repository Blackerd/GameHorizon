package org.example.backend.dto.request;

import lombok.Data;

@Data
public class OrderEditRequestDTO {
    private String fullname;
    private String address;
    private String status;
    private String phone;
}
