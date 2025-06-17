package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.ProductRequestDTO;
import org.example.backend.dto.response.ProductResponseDTO;
import org.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.example.backend.model.Product;


import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@Tag(name = "Product", description = "Product API")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public int addProduct(@RequestBody ProductRequestDTO product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/{productId}")
    public void updateProduct(@PathVariable int productId, @RequestBody ProductRequestDTO product) {
        productService.updateProduct(productId, product);
    }

    @DeleteMapping("/{productId}")
    public void deleteCustomer(@PathVariable int productId) {
        productService.deleteProduct(productId);
    }

    @GetMapping("/{productId}")
    public ProductResponseDTO getCustomer(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

    @GetMapping("/list")
    public List<ProductResponseDTO> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/list/{categoryId}")
    public List<ProductResponseDTO> getProductsByCategoryId(@PathVariable int categoryId) {
        return productService.findByCategoryId(categoryId);
    }

    @GetMapping("/list/findByName/{name}")
    public List<ProductResponseDTO> getProductsByName(@PathVariable String name) {
        return productService.findByNameContainingIgnoreCase(name);
    }

  
    @GetMapping("/search")
    public Page<Product> searchProducts(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return productService.advancedSearch(name, category, minPrice, maxPrice, page, size);
    }
}
