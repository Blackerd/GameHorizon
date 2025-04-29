package org.example.backend.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameResponseDTO {
    private Long id;
    private Integer appId;
    private String name;
    private String description;
    private String imageUrl;
    private Integer price;
}