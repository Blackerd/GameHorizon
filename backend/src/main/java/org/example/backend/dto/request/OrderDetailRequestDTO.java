package org.example.backend.dto.request;

import lombok.Data;

@Data
public class OrderDetailRequestDTO {
    private Integer productId;
    private Integer quantity;
}
