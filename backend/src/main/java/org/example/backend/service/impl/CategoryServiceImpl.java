package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.request.CategoryRequestDTO;
import org.example.backend.dto.response.CategoryResponseDTO;
import org.example.backend.model.Category;
import org.example.backend.repository.CategoryRepository;
import org.example.backend.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public int saveCategory(CategoryRequestDTO category) {
        Category cate = Category.builder()
                .name(category.getName())
                .img(category.getImg())
                .build();
        categoryRepository.save(cate);
        return cate.getId();
    }

    @Override
    public void updateCategory(int id, CategoryRequestDTO category) {
        Category cate = getById(id);
        cate.setName(category.getName());
        cate.setImg(category.getImg());
        categoryRepository.save(cate);
    }

    @Override
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryResponseDTO getCategory(int id) {
        Category cate = getById(id);
        return CategoryResponseDTO.builder()
                .id(cate.getId())
                .name(cate.getName())
                .img(cate.getImg())
                .build();
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponseDTO> categoriesResponseDTO = new ArrayList<>();
        for (Category category : categories) {
            categoriesResponseDTO.add(CategoryResponseDTO.builder()
                    .name(category.getName())
                    .img(category.getImg())
                    .id(category.getId())
                    .build());
        }
        return categoriesResponseDTO;
    }

    public Category getById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }


    public Category getByName(String name) {
        return categoryRepository.findByName(name);
    }
}
