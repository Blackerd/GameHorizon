package org.example.backend.service;

import org.example.backend.dto.request.ProductRequestDTO;
import org.example.backend.dto.response.ProductResponseDTO;
import org.example.backend.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    int saveProduct(ProductRequestDTO productRequestDTO);

    void updateProduct(int id, ProductRequestDTO productRequestDTO);

    void deleteProduct(int id);

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO getProductById(int id);

    List<ProductResponseDTO> findByCategoryId(Integer categoryId);

    List<ProductResponseDTO> findByNameContainingIgnoreCase(String name);
    Page<Product> advancedSearch(String name, String category, Double minPrice, Double maxPrice, int page, int size);
}
