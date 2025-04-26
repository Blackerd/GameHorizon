package org.example.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CategoryResponseDTO {
    private Integer id;
    private String name;
    private String img;
}
