package org.example.backend.repository;

import org.example.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryId(Integer categoryId);

    List<Product> findByNameContainingIgnoreCase(String name);

    // ...existing code...
    @Query("SELECT p FROM Product p WHERE "
        + "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) "
        + "AND (:category IS NULL OR p.category.name = :category) "
        + "AND (:minPrice IS NULL OR p.price >= :minPrice) "
        + "AND (:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> advancedSearch(
        @Param("name") String name,
        @Param("category") String category,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        Pageable pageable
    );
}
