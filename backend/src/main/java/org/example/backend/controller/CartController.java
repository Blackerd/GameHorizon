package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.CartRequestDTO;
import org.example.backend.dto.response.CartResponseDTO;
import org.example.backend.service.CartService;
import org.springframework.web.bind.annotation.*;
import org.example.backend.model.Cart;
import org.example.backend.service.CartItemService;
import org.example.backend.service.impl.CartItemServiceImpl;
import org.example.backend.service.impl.CartServiceImpl;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Cart API")
public class CartController {
    private final CartService cartService;


    private final CartItemService cartItemService;    

    @PostMapping
    public int saveCart(@RequestBody CartRequestDTO cartRequestDTO) {
        return cartService.saveCart(cartRequestDTO);
    }

    @GetMapping("/{customerId}")
    public CartResponseDTO getCartByCustomerId(@PathVariable int customerId) {
        return cartService.getCartByCustomerId(customerId);
    }

    @DeleteMapping("/clear/{customerId}")
    public void clearCart(@PathVariable int customerId) {
        Cart cart = cartService.getByCustomerId(customerId);
        if (cart != null) {
            cartItemService.deleteCartItemByCartId(cart.getId());
        }
    }

}
