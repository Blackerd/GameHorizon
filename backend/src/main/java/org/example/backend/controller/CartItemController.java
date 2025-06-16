package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.CartItemRequestDTO;
import org.example.backend.service.CartItemService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cartItem")
@RequiredArgsConstructor
@Tag(name = "CartItem", description = "CartItem API")
public class CartItemController {
    private final CartItemService cartItemService;

    @PostMapping
    public int saveCartItem(@RequestBody CartItemRequestDTO cartItemRequestDTO) {
        return cartItemService.saveCartItem(cartItemRequestDTO);
    }

    @DeleteMapping("/{cartItemId}")
    public void deleteCartItem(@PathVariable("cartItemId") int cartItemId) {
        cartItemService.deleteCartItem(cartItemId);
    }

    @DeleteMapping("/cartId/{cartId}")
    public void deleteCartItemByCartId(@PathVariable("cartId") int cartId) {
        cartItemService.deleteCartItemByCartId(cartId);
    }
}
