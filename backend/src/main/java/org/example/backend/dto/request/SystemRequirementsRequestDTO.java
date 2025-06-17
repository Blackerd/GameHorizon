package org.example.backend.dto.request;

import lombok.Data;

@Data
public class SystemRequirementsRequestDTO {
    private String os;
    private String processor;
    private String memory;
    private String graphics;
    private String directx;
    private String storage;
}