package org.example.backend.service;


import org.example.backend.dto.request.OrderDetailSaveRequest;
import org.example.backend.dto.response.OrderDetailResponseDTO;

import java.util.List;

public interface OrderDetailService {
    OrderDetailResponseDTO saveOrderDetail(OrderDetailSaveRequest requestDTO);

    OrderDetailResponseDTO updateOrderDetail(int id, OrderDetailSaveRequest requestDTO);

    void deleteOrderDetail(int id);

    OrderDetailResponseDTO findOrderDetailById(int id);

    List<OrderDetailResponseDTO> findOrderDetailByOrderId(int orderId);

    OrderDetailResponseDTO findOrderDetailByProductId(int productId);


}
