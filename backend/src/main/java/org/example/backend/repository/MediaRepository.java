package org.example.backend.repository;

import org.example.backend.model.Media;
import org.example.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Integer> {
    void deleteAllByProduct(Product product);
}