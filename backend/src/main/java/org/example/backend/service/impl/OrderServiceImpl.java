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
import org.example.backend.model.Customer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * OrderServiceImpl xử lý các nghiệp vụ liên quan đến đơn hàng cho web bán game digital.
 * - Khi thanh toán thành công, tạo đơn hàng với trạng thái COMPLETED, sinh key cho từng game, gửi email xác nhận.
 * - Không còn logic giao hàng vật lý.
 * - Hỗ trợ lấy lịch sử đơn hàng, doanh thu, v.v.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final CustomerServiceImpl customerService;
    private final ProductServiceImpl productService;
    private final EmailServiceImpl emailService;

    /**
     * Tạo đơn hàng digital: luôn sinh key cho từng game, gửi mail xác nhận, trạng thái luôn COMPLETED.
     * @param orderRequestDTO thông tin đơn hàng từ client
     * @return id đơn hàng vừa tạo
     */
    @Override
public int saveOrder(OrderRequestDTO orderRequestDTO) {
    // Kiểm tra khách hàng tồn tại
    Customer customer = customerRepository.findById(orderRequestDTO.getCustomerId())
        .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + orderRequestDTO.getCustomerId()));

    // Lấy danh sách game đã sở hữu
    List<Integer> ownedGameIds = getLibraryByCustomerId(customer.getId())
        .stream().map(dto -> dto.getProductResponseDTO().getId()).collect(Collectors.toList());

    // Lọc các game chưa sở hữu để tạo order
    List<OrderDetail> orderDetails = orderRequestDTO.getOrderDetails().stream()
        .filter(dto -> !ownedGameIds.contains(dto.getProductId()))
        .map(this::convertToOrderDetailEntityWithKey)
        .collect(Collectors.toList());

    if (orderDetails.isEmpty()) {
        throw new IllegalArgumentException("Tất cả game trong đơn hàng đã sở hữu.");
    }

    // Tạo đối tượng Order
    Order order = Order.builder()
            .customer(customer)
            .orderDate(LocalDateTime.now())
            .totalAmount(orderRequestDTO.getTotalAmount())
            .address(orderRequestDTO.getAddress())
            .numberPhone(orderRequestDTO.getNumberPhone())
            .receiver(orderRequestDTO.getReceiver())
            .status(OrderStatus.COMPLETED.getValue())
            .paymentMethod(orderRequestDTO.getPaymentMethod())
            .orderDetails(orderDetails)
            .build();

    order.getOrderDetails().forEach(orderDetail -> orderDetail.setOrder(order));
    int orderId = orderRepository.save(order).getId();

    sendPurchaseConfirmationEmail(order);

    return orderId;
}

    /**
     * Chuyển DTO sang entity OrderDetail, đồng thời sinh key cho từng game.
     */
    private OrderDetail convertToOrderDetailEntityWithKey(OrderDetailRequestDTO dto) {
        return OrderDetail.builder()
                .product(productService.getById(dto.getProductId()))
                .activationKey(generateActivationKey())
                .build();
    }

    /**
     * Gửi email xác nhận mua game, liệt kê từng game và key tương ứng.
     */
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
                        .append(" - Giá: ").append(product.getPrice()).append(" VND")
                        .append(" - <b>Key:</b> ").append(detail.getActivationKey())
                        .append("</li>");
            }

            emailContent.append("</ul>")
                    .append("<p>Hãy sử dụng key này để kích hoạt game trên Steam hoặc Epic Games.</p>")
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

    /**
     * Sinh key random cho game (giả lập key digital).
     */
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
        return key.toString();
    }

    /**
     * Lấy thông tin đơn hàng theo id.
     */
    @Override
    public OrderResponseDTO getOrder(int orderId) {
        Order order = getOrderById(orderId);
        if (order == null) {
            return null;
        }
        return convertToOrderResponseDTO(order);
    }

    /**
     * Xóa đơn hàng theo id.
     */
    @Override
    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }

    /**
     * Cập nhật thông tin đơn hàng (không cập nhật key).
     */
    @Override
    public void updateOrder(int id, OrderRequestDTO orderRequestDTO) {
        Order order = getOrderById(id);
        if (order != null) {
            order.setTotalAmount(orderRequestDTO.getTotalAmount());
            order.setAddress(orderRequestDTO.getAddress());
            order.setNumberPhone(orderRequestDTO.getNumberPhone());
            order.setStatus(orderRequestDTO.getStatus());
            // Không sinh lại key khi update order
            order.setOrderDetails(orderRequestDTO.getOrderDetails().stream()
                    .map(this::convertToOrderDetailEntity)
                    .collect(Collectors.toList()));
            order.getOrderDetails().forEach(orderDetail -> orderDetail.setOrder(order));
            orderRepository.save(order);
        }
    }

    /**
     * Lấy danh sách đơn hàng theo customerId.
     */
    @Override
    public List<OrderResponseDTO> getOrderByCustomerId(int customerId) {
        return getOrdersByCustomerId(customerId);
    }

    /**
     * Lấy tất cả đơn hàng.
     */
    @Override
    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) {
            return Collections.emptyList();
        }
        return orders.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Chỉnh sửa thông tin đơn hàng (không chỉnh sửa key).
     */
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

    /**
     * Lấy doanh thu theo tháng.
     */
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

    /**
     * Lấy đơn hàng theo trạng thái.
     */
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

    /**
     * Đổi trạng thái đơn hàng (nên chỉ dùng cho huỷ đơn, không dùng cho giao hàng vật lý).
     */
    @Override
    public void changeOrderStatus(int orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);
        }
    }

    /**
     * Lấy đơn hàng theo trạng thái và customerId.
     */
    @Override
    public List<OrderResponseDTO> getOrdersByStatusAndCustomerId(String status, int customerId) {
        List<Order> orders = orderRepository.findByStatusAndCustomerId(status, customerId);
        if (orders.isEmpty()) {
            return Collections.emptyList();
        }
        return orders.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy danh sách đơn hàng theo customerId.
     */
    public List<OrderResponseDTO> getOrdersByCustomerId(int customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        if (orders.isEmpty()) {
            return Collections.emptyList();
        }
        return orders.stream()
                .map(this::convertToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy order theo id (private).
     */
    private Order getOrderById(int orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    /**
     * Chuyển Order sang OrderResponseDTO, trả về cả key cho client nếu cần.
     */
    private OrderResponseDTO convertToOrderResponseDTO(Order order) {
        List<OrderDetailResponseDTO> orderDetailDTOs = order.getOrderDetails().stream()
                .map(this::convertToOrderDetailResponseDTO)
                .collect(Collectors.toList());

        return OrderResponseDTO.builder()
                .id(order.getId())
                .customerDTO(customerService.getCustomer(order.getCustomer().getId()))
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .address(order.getAddress())
                .numberPhone(order.getNumberPhone())
                .status(order.getStatus())
                .receiver(order.getReceiver())
                .orderDetails(orderDetailDTOs)
                .build();
    }

    /**
     * Chuyển OrderDetail sang DTO, trả về key cho client.
     */
    private OrderDetailResponseDTO convertToOrderDetailResponseDTO(OrderDetail orderDetail) {
        return OrderDetailResponseDTO.builder()
                .id(orderDetail.getId())
                .orderId(orderDetail.getOrder().getId())
                .productResponseDTO(productService.getProductById(orderDetail.getProduct().getId()))
                .activationKey(orderDetail.getActivationKey()) // Trả về key cho client
                .build();
    }

    /**
     * Chuyển DTO sang entity OrderDetail (không sinh lại key).
     */
    private OrderDetail convertToOrderDetailEntity(OrderDetailRequestDTO dto) {
        return OrderDetail.builder()
                .product(productService.getById(dto.getProductId()))
                .build();
    }
    // OrderServiceImpl.java
    public List<OrderDetailResponseDTO> getLibraryByCustomerId(int customerId) {
        List<Order> orders = orderRepository.findByStatusAndCustomerId( OrderStatus.COMPLETED.getValue(), customerId);
        return orders.stream()
            .flatMap(order -> order.getOrderDetails().stream())
            .map(this::convertToOrderDetailResponseDTO)
            .collect(Collectors.toList());
    }
    public boolean hasUserOwnedGame(int customerId, int productId) {
    List<OrderDetailResponseDTO> library = getLibraryByCustomerId(customerId);
    return library.stream().anyMatch(dto -> dto.getProductResponseDTO().getId() == productId);
}

@Override
public List<OrderResponseDTO> getOrderHistory(int customerId, int page, int size) {
    // Ví dụ: phân trang đơn giản
    List<Order> orders = orderRepository.findByCustomerId(customerId);
    int fromIndex = Math.min(page * size, orders.size());
    int toIndex = Math.min(fromIndex + size, orders.size());
    List<Order> pagedOrders = orders.subList(fromIndex, toIndex);
    return pagedOrders.stream()
            .map(this::convertToOrderResponseDTO)
            .collect(Collectors.toList());
}
}