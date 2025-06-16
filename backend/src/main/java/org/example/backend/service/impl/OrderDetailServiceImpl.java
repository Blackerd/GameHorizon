package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.OrderDetailSaveRequest;
import org.example.backend.dto.response.OrderDetailResponseDTO;
import org.example.backend.dto.response.ProductResponseDTO;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDetail;
import org.example.backend.model.Product;
import org.example.backend.repository.OrderDetailRepository;
import org.example.backend.repository.OrderRepository;
import org.example.backend.repository.ProductRepository;
import org.example.backend.service.OrderDetailService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {
        private final OrderDetailRepository orderDetailRepository;
        private final OrderRepository orderRepository;
        private final ProductRepository productRepository;

        @Override
        public OrderDetailResponseDTO saveOrderDetail(OrderDetailSaveRequest requestDTO) {
                Order order = orderRepository.findById(requestDTO.getOrderId()).orElse(null);
                Product product = productRepository.findById(requestDTO.getProductId()).orElse(null);
                orderDetailRepository.save(OrderDetail.builder()
                                .order(order)
                                .product(product)
                                .build());

                return OrderDetailResponseDTO.builder()
                                .orderId(order.getId())
                                .productResponseDTO(ProductResponseDTO.builder()
                                                .id(product.getId())
                                                .name(product.getName())
                                                .img(product.getImg())
                                                .categoryName(product.getCategory().getName())
                                                .price(product.getPrice())
                                                .build())
                                .build();
        }

        @Override
        public OrderDetailResponseDTO updateOrderDetail(int id, OrderDetailSaveRequest requestDTO) {
                OrderDetail orderDetail = orderDetailRepository.findById(id).orElse(null);
                Order order = orderRepository.findById(requestDTO.getOrderId()).orElse(null);
                Product product = productRepository.findById(requestDTO.getProductId()).orElse(null);
                orderDetail.setOrder(order);
                orderDetail.setProduct(product);
                return OrderDetailResponseDTO.builder()
                                .orderId(order.getId())
                                .productResponseDTO(ProductResponseDTO.builder()
                                                .id(product.getId())
                                                .name(product.getName())
                                                .img(product.getImg())
                                                .categoryName(product.getCategory().getName())
                                                .price(product.getPrice())
                                                .build())
                                .build();
        }

        @Override
        public void deleteOrderDetail(int id) {
                orderDetailRepository.deleteById(id);
        }

        @Override
        public OrderDetailResponseDTO findOrderDetailById(int id) {
                OrderDetail orderDetail = orderDetailRepository.findById(id).orElse(null);
                Product product = productRepository.findById(orderDetail.getProduct().getId()).orElse(null);
                return OrderDetailResponseDTO.builder()
                                .productResponseDTO(ProductResponseDTO.builder()
                                                .id(product.getId())
                                                .name(product.getName())
                                                .img(product.getImg())
                                                .categoryName(product.getCategory().getName())
                                                .price(product.getPrice())
                                                .build())
                                .orderId(orderDetail.getOrder().getId())
                                .build();
        }

        @Override
        public List<OrderDetailResponseDTO> findOrderDetailByOrderId(int orderId) {

                List<OrderDetail> orderDetails = orderDetailRepository.findOrderByOrderId(orderId);

                return orderDetails.stream()
                                .map(orderDetail -> OrderDetailResponseDTO.builder()
                                                .orderId(orderDetail.getOrder().getId())
                                                .productResponseDTO(ProductResponseDTO.builder()
                                                                .id(orderDetail.getProduct().getId())
                                                                .price(orderDetail.getProduct().getPrice())
                                                                .categoryName(orderDetail.getProduct().getCategory()
                                                                                .getName())
                                                                .name(orderDetail.getProduct().getName())
                                                                .img(orderDetail.getProduct().getImg())
                                                                .build())
                                                .build())
                                .collect(Collectors.toList());
        }

        @Override
        public OrderDetailResponseDTO findOrderDetailByProductId(int productId) {
                OrderDetail orderDetail = orderDetailRepository.findOrderByProductId(productId);
                return OrderDetailResponseDTO.builder()
                                .orderId(orderDetail.getOrder().getId())
                                .productResponseDTO(ProductResponseDTO.builder()
                                                .id(orderDetail.getProduct().getId())
                                                .price(orderDetail.getProduct().getPrice())
                                                .categoryName(orderDetail.getProduct().getCategory().getName())
                                                .name(orderDetail.getProduct().getName())
                                                .img(orderDetail.getProduct().getImg())
                                                .build())
                                .build();
        }
}
