package org.example.backend.dto.request;

import lombok.Data;

@Data
public class OrderDetailSaveRequest {
    private Integer productId;
    private Integer orderId;
}
