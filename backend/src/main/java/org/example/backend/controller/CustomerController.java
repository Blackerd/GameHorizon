package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.*;
import org.example.backend.dto.response.CustomerResponseDTO;
import org.example.backend.service.CartService;
import org.example.backend.service.CustomerService;
import org.example.backend.service.impl.CustomerServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;
import org.example.backend.config.JwtUtil;
import org.example.backend.dto.response.CartResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@Tag(name = "Customer", description = "Customer API")
public class CustomerController {
    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
    private final CustomerService customerService;
    private final CartService cartService;
    private final CustomerServiceImpl customerServiceImpl;
    private final JwtUtil jwtUtil;

    @PostMapping
    public int addCustomer(@RequestBody CustomerRequestDTO customer) {
        if (customerService.checkUsername(customer.getUsername())) {
            return -1;
        }
        int userId = customerService.saveCustomer(customer);
        CartRequestDTO cartRequestDTO = new CartRequestDTO();
        cartRequestDTO.setCustomerId(userId);
        cartService.saveCart(cartRequestDTO);
        return userId;
    }

    @PutMapping("/{customerId}")
    public void updateCustomer(@PathVariable int customerId, @RequestBody CustomerRequestDTO customer) {
        customerService.updateCustomer(customerId, customer);
    }

    @PutMapping("/admin/{customerId}")
    public void updateAdmin(@PathVariable int customerId, @RequestBody CustomerRequestDTO customer) {
        customerService.updateByAdmin(customerId, customer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{customerId}")
    public void deleteCustomer(@PathVariable int customerId) {
        customerService.deleteCustomer(customerId);
    }

    @GetMapping("/{customerId}")
    public CustomerResponseDTO getCustomer(@PathVariable int customerId) {
        return customerService.getCustomer(customerId);
    }

    @GetMapping("/list")
    public List<CustomerResponseDTO> getCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/checkUsername/{username}")
    public boolean checkUsername(@PathVariable String username) {
        return customerService.checkUsername(username);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        CustomerResponseDTO cus = customerService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (cus == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
        CartResponseDTO cart = cartService.getCartByCustomerId(cus.getId());
        if (cart != null) {
            cus.setCartId(cart.getId());
        } else {
            cus.setCartId(-1);
        }
        String roleStr = (cus.isRole() ? "ADMIN" : "USER");
        String token = jwtUtil.generateToken(cus.getUsername(), roleStr);
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", cus));
    }

    @PostMapping("/resetPassword/{username}")
    public void resetPassword(
            @PathVariable String username,
            @RequestParam String resetCode,
            @RequestParam String newPassword) {
        customerService.resetPassword(username, resetCode, newPassword);
    }

    @PostMapping("/initPasswordReset/{username}")
    public ResponseEntity<?> initPasswordReset(@PathVariable String username) {
        try {
            customerService.initPasswordReset(username);
            return ResponseEntity.ok("Đã gửi mã xác nhận về email.");
        } catch (Exception e) {
            // Log lỗi chi tiết cho backend
            e.printStackTrace();
            // Trả về lỗi chi tiết cho FE
            return ResponseEntity.status(500).body("Lỗi gửi mail: " + e.getMessage());
        }
    }

    @PutMapping("/updateByUser/{id}")
    public CustomerResponseDTO updateByUser(@PathVariable int id, @RequestBody CustomerUpdateRequestDTO customer) {
        return customerService.updateCustomerById(id, customer);
    }

    @PatchMapping("/changePassword/{customerId}")
    public void changePassword(@PathVariable int customerId, @RequestBody ChangePasswordDto dto) {
        customerService.changePassword(customerId, dto.getOldPassword(), dto.getNewPassword());
    }

}
