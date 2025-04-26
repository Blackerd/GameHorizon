package org.example.backend.service;


import org.example.backend.dto.request.CategoryRequestDTO;
import org.example.backend.dto.response.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    int saveCategory(CategoryRequestDTO category);
    void updateCategory(int id,CategoryRequestDTO category);
    void deleteCategory(int id);
    CategoryResponseDTO getCategory(int id);
    List<CategoryResponseDTO> getAllCategories();
}
