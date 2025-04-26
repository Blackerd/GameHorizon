package org.example.backend.service;


import org.example.backend.dto.request.CartRequestDTO;
import org.example.backend.dto.response.CartResponseDTO;

public interface CartService {
    int saveCart(CartRequestDTO cartRequestDTO);

    CartResponseDTO getCart(int cartId);

    CartResponseDTO getCartByCustomerId(int id);

    int getQuantityCartItemInCart(int cartId);
}
