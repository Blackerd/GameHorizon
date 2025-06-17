package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.OrderMethod;
import org.example.backend.common.OrderStatus;
import org.example.backend.dto.request.OrderEditRequestDTO;
import org.example.backend.dto.request.OrderRequestDTO;
import org.example.backend.dto.response.MonthlyRevenueResponse;
import org.example.backend.dto.response.OrderDetailResponseDTO;
import org.example.backend.dto.response.OrderResponseDTO;
import org.example.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Tag(name = "Order", description = "Order API")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public int saveOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        // Mặc định trạng thái là COMPLETED nếu FE không gửi lên
        if (orderRequestDTO.getStatus() == null || orderRequestDTO.getStatus().isEmpty()) {
            orderRequestDTO.setStatus("COMPLETED");
        }
        // Luôn set paymentMethod là CARD (FE chỉ gửi CARD)
        orderRequestDTO.setPaymentMethod("CARD");
        return orderService.saveOrder(orderRequestDTO);
    }

    @PutMapping("/order/{orderId}")
    public void editOrder(@RequestBody OrderEditRequestDTO orderRequestDTO, @PathVariable("orderId") int orderId) {
        orderService.editOrder(orderId, orderRequestDTO);
    }

    @GetMapping("/customer/{customerId}")
    public List<OrderResponseDTO> getOrderByCustomerId(@PathVariable int customerId) {
        return orderService.getOrderByCustomerId(customerId);
    }

    @GetMapping("/list")
    public List<OrderResponseDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable("orderId") int orderId) {
        orderService.deleteOrder(orderId);
    }

    @GetMapping("/revenue")
    public List<MonthlyRevenueResponse> getOrderRevenue() {
        return orderService.getMonthlyRevenue();
    }

    @GetMapping("/{status}")
    public List<OrderResponseDTO> getOrderByStatus(@PathVariable OrderStatus status) {
        return orderService.getOrdersByStatus(status.getValue());
    }

    @PutMapping("/status/{status}&&{orderId}")
    public ResponseEntity<String> changeOrderStatus(@PathVariable("status") OrderStatus status,
            @PathVariable("orderId") int orderId) {
        try {
            orderService.changeOrderStatus(orderId, status.getValue());
            return ResponseEntity.ok("Cập nhật trạng thái thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi: " + e.getMessage());
        }
    }

    @GetMapping("/client/{status}&&{customerId}")
    public List<OrderResponseDTO> getOrderByStatusAndCustomerId(@PathVariable String status,
            @PathVariable int customerId) {
        return orderService.getOrdersByStatusAndCustomerId(status, customerId);
    }

    @GetMapping("/library/{customerId}")
    public List<OrderDetailResponseDTO> getLibrary(@PathVariable int customerId) {
        return orderService.getLibraryByCustomerId(customerId);
    }

    @GetMapping("/history/{customerId}")
    public List<OrderResponseDTO> getOrderHistory(
            @PathVariable int customerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Triển khai phân trang ở service/repository
        return orderService.getOrderHistory(customerId, page, size);
    }

    @GetMapping("/owned/{customerId}/{productId}")
    public boolean hasUserOwnedGame(@PathVariable int customerId, @PathVariable int productId) {
        return orderService.hasUserOwnedGame(customerId, productId);
    }
}
