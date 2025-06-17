package org.example.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Getter
public class OrderResponseDTO {
    private Integer id;
    private CustomerResponseDTO customerDTO;
    private LocalDateTime orderDate;
    private Integer totalAmount;
    private String status;
    private List<OrderDetailResponseDTO> orderDetails;
}
