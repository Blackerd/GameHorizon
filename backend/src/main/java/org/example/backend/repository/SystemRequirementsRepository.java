package org.example.backend.repository;

import org.example.backend.model.SystemRequirements;
import org.example.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemRequirementsRepository extends JpaRepository<SystemRequirements, Integer> {
    void deleteByProduct(Product product);
}