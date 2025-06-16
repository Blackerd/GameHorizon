package org.example.backend.common;

import lombok.Getter;

@Getter
public enum OrderStatus {
    PENDING("Chờ thanh toán"),
    COMPLETED("Đã thanh toán"),
    CANCELLED("Đã hủy");

    private final String value;

    OrderStatus(String value) {
        this.value = value;
    }
}
