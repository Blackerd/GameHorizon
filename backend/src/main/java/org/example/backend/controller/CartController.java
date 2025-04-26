package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.CartRequestDTO;
import org.example.backend.dto.response.CartResponseDTO;
import org.example.backend.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Cart API")
public class CartController {
    private final CartService cartService;

    @PostMapping
    public int saveCart(@RequestBody CartRequestDTO cartRequestDTO) {
        return cartService.saveCart(cartRequestDTO);
    }

    @GetMapping("/{customerId}")
    public CartResponseDTO getCartByCustomerId(@PathVariable int customerId) {
        return cartService.getCartByCustomerId(customerId);
    }

    @GetMapping("/quantity/{cartId}")
    public int getCart(@PathVariable int cartId) {
        return cartService.getQuantityCartItemInCart(cartId);
    }

}
