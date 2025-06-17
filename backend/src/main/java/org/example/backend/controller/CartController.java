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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.AccessDeniedException;
import org.example.backend.service.CustomerService;
import org.example.backend.service.impl.CustomerServiceImpl;


@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Cart API")
public class CartController {
    private final CartService cartService;

    private final CustomerService customerService;

    private final CartItemService cartItemService;

    @PostMapping
    public int saveCart(@RequestBody CartRequestDTO cartRequestDTO) {
        return cartService.saveCart(cartRequestDTO);
    }

   // ...existing code...
    @GetMapping("/{customerId}")
    public CartResponseDTO getCartByCustomerId(@PathVariable int customerId) {
        // Lấy username từ JWT (SecurityContext)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Lấy customerId thực tế từ username
        int realCustomerId = customerService.getCustomerByUsername(username)
            .getId();

        // Nếu customerId trong path khác với user hiện tại, trả về 403
        if (customerId != realCustomerId) {
            throw new AccessDeniedException("Bạn không có quyền truy cập giỏ hàng này!");
        }

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
