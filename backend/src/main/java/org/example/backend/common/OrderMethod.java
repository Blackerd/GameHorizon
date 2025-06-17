package org.example.backend.common;

import lombok.Getter;

@Getter
public enum OrderMethod {
    CARD("Thanh toán qua thẻ");

    private final String value;

    OrderMethod(String value) {
        this.value = value;
    }
}