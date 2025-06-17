package org.example.backend.repository;

import org.example.backend.model.Dlc;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.example.backend.model.Product;

public interface DlcRepository extends JpaRepository<Dlc, Integer> {
    List<Dlc> findByProductId(Integer productId);

    void deleteAllByProduct(Product product);
}