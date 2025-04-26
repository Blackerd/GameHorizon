package org.example.backend.service;


import org.example.backend.dto.request.CartItemRequestDTO;
import org.example.backend.dto.response.CartItemResponseDTO;

public interface CartItemService {
    int saveCartItem(CartItemRequestDTO cartItem);

    CartItemResponseDTO getCartItem(int cartItemId);

    void deleteCartItem(int cartItemId);

    void updateCartItem(int id, CartItemRequestDTO cartItem);

    void updateCartItemQuantity(int cartItemId, int quantity);

    void deleteCartItemByCartId(int cartId);

}
