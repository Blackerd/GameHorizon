package org.example.backend.repository;

import org.example.backend.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.example.backend.model.Product;

public interface AchievementRepository extends JpaRepository<Achievement, Integer> {
    List<Achievement> findByProductId(Integer productId);

    void deleteAllByProduct(Product product);
}