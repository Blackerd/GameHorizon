package org.example.backend.dto.request;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class OrderRequestDTO {
    private Integer customerId;
    private Integer totalAmount;
    private String address;
    private String numberPhone;
    @Hidden
    private String status;
    @Hidden
    private String paymentMethod;
    private String receiver;
    private List<OrderDetailRequestDTO> orderDetails;
}

