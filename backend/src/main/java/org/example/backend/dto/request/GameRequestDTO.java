package org.example.backend.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameRequestDTO {
    private Integer appId;
    private String name;
    private String description;
    private String imageUrl;
    private Integer price;
}