package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.request.ProductRequestDTO;
import org.example.backend.dto.response.ProductResponseDTO;
import org.example.backend.model.Category;
import org.example.backend.model.Product;
import org.example.backend.repository.ProductRepository;
import org.example.backend.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryServiceImpl categoryService;

    @Override
    public int saveProduct(ProductRequestDTO productRequestDTO) {
        Product product = Product.builder()
                .name(productRequestDTO.getName())
                .price(productRequestDTO.getPrice())
                .img(productRequestDTO.getImg())
                .category(categoryService.getByName(productRequestDTO.getCategoryName()))
                .detail(productRequestDTO.getDetail())
                .build();
        return productRepository.save(product).getId();
    }

    @Override
    public void updateProduct(int id, ProductRequestDTO productRequestDTO) {
        Product product = getById(id);
        Category category = categoryService.getByName(productRequestDTO.getCategoryName());
        product.setCategory(category);
        product.setDetail(productRequestDTO.getDetail());
        product.setName(productRequestDTO.getName());
        product.setPrice(productRequestDTO.getPrice());
        product.setImg(productRequestDTO.getImg());
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductResponseDTO> productResponseDTOS = new ArrayList<>();
        for (Product product : products) {
            productResponseDTOS.add(ProductResponseDTO.builder()
                    .categoryName(product.getCategory().getName())
                    .price(product.getPrice())
                    .name(product.getName())
                    .img(product.getImg())
                    .id(product.getId())
                    .detail(product.getDetail())

                    .build());
        }
        return productResponseDTOS;
    }

    @Override
    public ProductResponseDTO getProductById(int id) {
        Product product = getById(id);
        return ProductResponseDTO.builder()
                .categoryName(product.getCategory().getName())
                .price(product.getPrice())
                .name(product.getName())
                .img(product.getImg())
                .id(product.getId())
                .detail(product.getDetail())
                .build();
    }

    @Override
    public List<ProductResponseDTO> findByCategoryId(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(product -> ProductResponseDTO.builder()
                        .categoryName(product.getCategory().getName())
                        .price(product.getPrice())
                        .name(product.getName())
                        .img(product.getImg())
                        .id(product.getId())
                        .detail(product.getDetail())
                        .build())
                .collect(Collectors.toList());

    }

    @Override
    public List<ProductResponseDTO> findByNameContainingIgnoreCase(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        List<ProductResponseDTO> productResponseDTOS = new ArrayList<>();
        for (Product product : products) {
            productResponseDTOS.add(ProductResponseDTO.builder()
                    .categoryName(product.getCategory().getName())
                    .price(product.getPrice())
                    .name(product.getName())
                    .img(product.getImg())
                    .id(product.getId())
                    .detail(product.getDetail())
                    .build());
        }
        return productResponseDTOS;
    }

    public Product getById(int id) {
        return productRepository.findById(id).orElse(null);
    }
    @Override
    public Page<Product> advancedSearch(String name, String category, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.advancedSearch(name, category, minPrice, maxPrice, pageable);
    }
    
}
