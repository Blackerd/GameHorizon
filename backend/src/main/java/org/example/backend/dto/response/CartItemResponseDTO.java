package org.example.backend.dto.response;

import lombok.*;

@Builder
@Data
public class CartItemResponseDTO {
    private int id;
    private ProductResponseDTO product;
}
