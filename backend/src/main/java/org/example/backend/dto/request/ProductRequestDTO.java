package org.example.backend.dto.request;

import lombok.Getter;

import java.io.Serializable;
@Getter
public class ProductRequestDTO implements Serializable {
    private String name;
    private String img;
    private int price;
    private String categoryName;
    private String detail;

}
