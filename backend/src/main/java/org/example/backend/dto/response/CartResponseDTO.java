package org.example.backend.dto.response;

import lombok.*;

import java.util.List;
@Builder
@Data
public class CartResponseDTO {
    private int id;
    private int customerId;
    private float totalPrice;
    private List<CartItemResponseDTO> cartItems;
}
