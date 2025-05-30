package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.example.backend.common.OrderStatus;
import org.example.backend.dto.request.OrderDetailRequestDTO;
import org.example.backend.dto.request.OrderEditRequestDTO;
import org.example.backend.dto.request.OrderRequestDTO;
import org.example.backend.dto.response.CustomerResponseDTO;
import org.example.backend.dto.response.MonthlyRevenueResponse;
import org.example.backend.dto.response.OrderDetailResponseDTO;
import org.example.backend.dto.response.OrderResponseDTO;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDetail;
import org.example.backend.model.Product;
import org.example.backend.repository.CustomerRepository;
import org.example.backend.repository.OrderRepository;
import org.example.backend.service.OrderService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final CustomerServiceImpl customerService;
    private final ProductServiceImpl productService;
    private final EmailServiceImpl emailService;

    @Override
    public int saveOrder(OrderRequestDTO orderRequestDTO) {
        // Validate customer
        if (customerRepository.findById(orderRequestDTO.getCustomerId()).isEmpty()) {
            throw new IllegalArgumentException("Customer not found with ID: " + orderRequestDTO.getCustomerId());
        }

        Order order = Order.builder()
                .customer(customerRepository.findById(orderRequestDTO.getCustomerId()).orElse(null))
                .orderDate(LocalDateTime.now())
                .totalAmount(orderRequestDTO.getTotalAmount())
                .address(orderRequestDTO.getAddress())
                .numberPhone(orderRequestDTO.getNumberPhone())
                .receiver(orderRequestDTO.getReceiver())
                .status(orderRequestDTO.getStatus())
                .paymentMethod(orderRequestDTO.getPaymentMethod())
                .orderDetails(orderRequestDTO.getOrderDetails().stream()
                        .map(this::convertToOrderDetailEntity)
                        .collect(Collectors.toList()))
                .build();

        order.getOrderDetails().forEach(orderDetail -> orderDetail.setOrder(order));

        // Send confirmation email if status is PAID
        if (orderRequestDTO.getStatus().equals(OrderStatus.DELIVERED.getValue())) {
            sendPurchaseConfirmationEmail(order);
        }

        return orderRepository.save(order).getId();
    }

    private void sendPurchaseConfirmationEmail(Order order) {
        try {
            CustomerResponseDTO customer = customerService.getCustomer(order.getCustomer().getId());
            StringBuilder emailContent = new StringBuilder();
            emailContent.append("<h2>Xác nhận mua game thành công - GameHorizon</h2>")
                    .append("<p>Kính gửi ").append(customer.getFullname()).append(",</p>")
                    .append("<p>Cảm ơn bạn đã mua game tại GameHorizon. Dưới đây là chi tiết đơn hàng:</p>")
                    .append("<p><b>Mã đơn hàng:</b> ").append(order.getId()).append("</p>")
                    .append("<p><b>Ngày đặt hàng:</b> ").append(order.getOrderDate()).append("</p>")
                    .append("<p><b>Tổng tiền:</b> ").append(order.getTotalAmount()).append(" VND</p>")
                    .append("<h3>Chi tiết game đã mua:</h3>")
                    .append("<ul>");

            for (OrderDetail detail : order.getOrderDetails()) {
                Product product = detail.getProduct();
                emailContent.append("<li>")
                        .append(product.getName())
                        .append(" - Số lượng: ").append(detail.getQuantity())
                        .append(" - Giá: ").append(product.getPrice()).append(" VND")
                        .append("</li>");
            }

            String activationKey = generateActivationKey();
            emailContent.append("</ul>")
                    .append("<p><b>Mã kích hoạt game:</b> ").append(activationKey)
                    .append("<br>(Sử dụng mã này để kích hoạt game trên Steam hoặc Epic Games)</p>")
                    .append("<p>Trân trọng,<br>GameHorizon Team</p>");

            emailService.sendPasswordResetEmail(
                    customer.getEmail(),
                    "Xác nhận mua game thành công - GameHorizon",
                    emailContent.toString());
            log.info("Purchase confirmation email sent to: {}", customer.getEmail());
        } catch (Exception e) {
            log.error("Failed to send purchase confirmation email for order ID: {}", order.getId(), e);
        }
    }

    private String generateActivationKey() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder key = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 19; i++) {
            if (i % 5 == 4)
                key.append('-');
            else
                key.append(chars.charAt(random.nextInt(chars.length())));
        }
        return key.toString(); // Example: ABCD-EFGH-IJKL-MNOP
    }

    @Override
    public OrderResponseDTO getOrder(int orderId) {
        Order order = getOrderById(orderId);
        if (order == null) {
            return null;
        }

        return convertToOrderResponseDTO(order);
    }

    @Override
    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public void updateOrder(int id, OrderRequestDTO orderRequestDTO) {
        Order order = getOrderById(id);
        if (order != null) {
            order.setTotalAmount(orderRequestDTO.getTotalAmount());
            order.setAddress(orderRequestDTO.getAddress());
            order.setNumberPhone(orderRequestDTO.getNumberPhone());
            order.setStatus(orderRequestDTO.getStatus());
            order.setOrderDetails(orderRequestDTO.getOrderDetails().stream()
                    .map(this::convertToOrderDetailEntity)
                    .collect(Collectors.toList()));
            order.getOrderDetails().forEach(orderDetail -> orderDetail.setOrder(order));
            orderRepository.save(order);
        }
    }

    @Override
    public List<OrderResponseDTO> getOrderByCustomerId(int customerId) {
        return getOrdersByCustomerId(customerId);
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) {
            return Collections.emptyList(); // Return an empty list if no orders found
        }

        return orders.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void editOrder(int id, OrderEditRequestDTO orderEditRequestDTO) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setAddress(orderEditRequestDTO.getAddress());
            order.setNumberPhone(orderEditRequestDTO.getPhone());
            order.setStatus(orderEditRequestDTO.getStatus());
            order.setReceiver(orderEditRequestDTO.getFullname());
            orderRepository.save(order);
        }
    }

    @Override
    public List<MonthlyRevenueResponse> getMonthlyRevenue() {
        List<Object[]> monthlyData = orderRepository.getMonthlyRevenue();
        List<MonthlyRevenueResponse> responseList = new ArrayList<>();

        for (Object[] row : monthlyData) {
            int month = (int) row[0];
            BigDecimal value = (BigDecimal) row[1];
            long revenue = value.longValueExact();
            responseList.add(new MonthlyRevenueResponse(month, revenue));
        }

        return responseList;
    }

    @Override
    public List<OrderResponseDTO> getOrdersByStatus(String status) {
        List<Order> orders = orderRepository.findByStatus(status);
        if (orders.isEmpty()) {
            return Collections.emptyList();
        }
        return orders.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void changeOrderStatus(int orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
        }
        orderRepository.save(order);
    }

    @Override
    public List<OrderResponseDTO> getOrdersByStatusAndCustomerId(String status, int customerId) {
        List<Order> orderResponseDTO = orderRepository.findByStatusAndCustomerId(status, customerId);
        if (orderResponseDTO.isEmpty()) {
            return Collections.emptyList();
        }
        return orderResponseDTO.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    public List<OrderResponseDTO> getOrdersByCustomerId(int customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        if (orders.isEmpty()) {
            return Collections.emptyList(); // Return an empty list if no orders found
        }

        return orders.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    private Order getOrderById(int orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    private OrderResponseDTO convertToOrderResponseDTO(Order order) {
        List<OrderDetailResponseDTO> orderDetailDTOs = order.getOrderDetails().stream()
                .map(this::convertToOrderDetailResponseDTO)
                .collect(Collectors.toList());

        return OrderResponseDTO.builder()
                .id(order.getId())
                .customerDTO(customerService.getCustomer(order.getCustomer().getId()))
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount()) // Ensure this matches your field in OrderResponseDTO
                .address(order.getAddress())
                .numberPhone(order.getNumberPhone())
                .status(order.getStatus())
                .receiver(order.getReceiver())
                .orderDetails(orderDetailDTOs)
                .build();
    }

    private OrderDetailResponseDTO convertToOrderDetailResponseDTO(OrderDetail orderDetail) {
        return OrderDetailResponseDTO.builder()
                .id(orderDetail.getId())
                .orderId(orderDetail.getOrder().getId())
                .productResponseDTO(productService.getProductById(orderDetail.getProduct().getId()))
                .quantity(orderDetail.getQuantity())
                .build();
    }

    private OrderDetail convertToOrderDetailEntity(OrderDetailRequestDTO dto) {
        return OrderDetail.builder()
                .product(productService.getById(dto.getProductId()))
                .quantity(dto.getQuantity())
                .build();
    }
}
