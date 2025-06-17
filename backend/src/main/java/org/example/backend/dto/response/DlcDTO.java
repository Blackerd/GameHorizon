package org.example.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DlcDTO {
    private int id;
    private String name;
    private String img;
    private Integer price;
}