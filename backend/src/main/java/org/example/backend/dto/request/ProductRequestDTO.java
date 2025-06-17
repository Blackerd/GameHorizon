package org.example.backend.dto.request;

import lombok.*;

import java.io.Serializable;

@Data
public class ProductRequestDTO implements Serializable {
    private String name;
    private String img;
    private int price;
    private String categoryName;
    private String detail;

}
