package org.example.backend.service;


import org.example.backend.dto.request.OrderEditRequestDTO;
import org.example.backend.dto.request.OrderRequestDTO;
import org.example.backend.dto.response.MonthlyRevenueResponse;
import org.example.backend.dto.response.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    int saveOrder(OrderRequestDTO orderRequestDTO);

    OrderResponseDTO getOrder(int orderId);

    void deleteOrder(int orderId);

    void updateOrder(int id, OrderRequestDTO orderRequestDTO);

    List<OrderResponseDTO> getOrderByCustomerId(int customerId);

    List<OrderResponseDTO> getAllOrders();

    void editOrder(int id, OrderEditRequestDTO orderEditRequestDTO);

    List<MonthlyRevenueResponse> getMonthlyRevenue();

    List<OrderResponseDTO> getOrdersByStatus(String status);

    void changeOrderStatus(int orderId, String status);

    List<OrderResponseDTO> getOrdersByStatusAndCustomerId(String status, int customerId);
}
