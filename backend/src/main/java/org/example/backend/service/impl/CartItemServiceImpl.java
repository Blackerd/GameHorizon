package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.request.CartItemRequestDTO;
import org.example.backend.dto.response.CartItemResponseDTO;
import org.example.backend.model.CartItem;
import org.example.backend.repository.CartItemRepository;
import org.example.backend.service.CartItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartServiceImpl cartServiceImpl;
    private final ProductServiceImpl productServiceImpl;

   @Override
public int saveCartItem(CartItemRequestDTO cartItem) {
    int cartId = cartItem.getCartId();
    int productId = cartItem.getProductId();

    CartItem existingCartItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);

    if (existingCartItem != null) {
        // Đã có game này trong cart, không cho thêm nữa (không tăng số lượng)
        return existingCartItem.getId();
    } else {
        CartItem newCartItem = CartItem.builder()
                .cart(cartServiceImpl.getByCartId(cartId))
                .product(productServiceImpl.getById(productId))
                .build();
        return cartItemRepository.save(newCartItem).getId();
    }
}
    @Override
    public CartItemResponseDTO getCartItem(int cartItemId) {
        CartItem cartItem = getByCartId(cartItemId);
        return CartItemResponseDTO.builder()
                .id(cartItem.getId())
                .product(productServiceImpl.getProductById(cartItem.getProduct().getId()))
                .build();
    }

    @Override
    public void deleteCartItem(int cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
 

    @Override
    public void deleteCartItemByCartId(int cartId) {
        cartItemRepository.deleteByCartId(cartId);
    }

    public CartItem getByCartId(int cartItemId) {
        return cartItemRepository.findById(cartItemId).orElse(null);
    }

    public List<CartItemResponseDTO> getCartItemsByCartId(int cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);
        return cartItems.stream().map(cartItem -> CartItemResponseDTO.builder()
                .id(cartItem.getId())
                .product(productServiceImpl.getProductById(cartItem.getProduct().getId()))
                .build()).collect(Collectors.toList());
    }
}
