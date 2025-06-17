package org.example.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SystemRequirementsDTO {
    private String os;
    private String processor;
    private String memory;
    private String graphics;
    private String directx;
    private String storage;
}