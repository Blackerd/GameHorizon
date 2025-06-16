package org.example.backend.service;


import org.example.backend.dto.request.CartItemRequestDTO;
import org.example.backend.dto.response.CartItemResponseDTO;

public interface CartItemService {
    int saveCartItem(CartItemRequestDTO cartItem);

    CartItemResponseDTO getCartItem(int cartItemId);

    void deleteCartItem(int cartItemId);

    void deleteCartItemByCartId(int cartId);

}
