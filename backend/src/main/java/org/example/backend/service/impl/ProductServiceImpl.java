package org.example.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.request.ProductRequestDTO;
import org.example.backend.model.Category;
import org.example.backend.model.Product;
import org.example.backend.model.SystemRequirements;
import org.example.backend.repository.ProductRepository;
import org.example.backend.service.ProductService;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.example.backend.dto.response.*;
import org.example.backend.model.Dlc;
import org.example.backend.model.Media;
import org.example.backend.model.Achievement;
import org.example.backend.repository.DlcRepository;
import org.example.backend.repository.AchievementRepository;
import org.example.backend.repository.MediaRepository;
import org.example.backend.repository.SystemRequirementsRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryServiceImpl categoryService;
    private final DlcRepository dlcRepository;
    private final AchievementRepository achievementRepository;
    private final MediaRepository mediaRepository;
    private final SystemRequirementsRepository systemRequirementsRepository;

    @Override
    public int saveProduct(ProductRequestDTO dto) {
        Product product = Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .img(dto.getImg())
                .category(categoryService.getByName(dto.getCategoryName()))
                .detail(dto.getDetail())
                .developer(dto.getDeveloper())
                .publisher(dto.getPublisher())
                .releaseDate(dto.getReleaseDate())
                .platform(dto.getPlatform())
                .ageRating(dto.getAgeRating())
                .discount(dto.getDiscount())
                .epicRewards(dto.getEpicRewards())
                .refundType(dto.getRefundType())
                .build();

        // Lưu media nếu có
        if (dto.getMedia() != null) {
            List<Media> mediaList = dto.getMedia().stream()
                    .map(m -> {
                        Media media = new Media();
                        media.setType(m.getType());
                        media.setUrl(m.getUrl());
                        media.setProduct(product);
                        return media;
                    }).collect(Collectors.toList());
            product.setMedia(mediaList);
        }

        // Lưu dlcs nếu có
        if (dto.getDlcs() != null) {
            List<Dlc> dlcList = dto.getDlcs().stream()
                    .map(d -> {
                        Dlc dlc = new Dlc();
                        dlc.setName(d.getName());
                        dlc.setImg(d.getImg());
                        dlc.setPrice(d.getPrice());
                        dlc.setProduct(product);
                        return dlc;
                    }).collect(Collectors.toList());
            product.setDlcs(dlcList);
        }

        // Lưu achievements nếu có
        if (dto.getAchievements() != null) {
            List<Achievement> achievementList = dto.getAchievements().stream()
                    .map(a -> {
                        Achievement ach = new Achievement();
                        ach.setName(a.getName());
                        ach.setIcon(a.getIcon());
                        ach.setXp(a.getXp());
                        ach.setProduct(product);
                        return ach;
                    }).collect(Collectors.toList());
            product.setAchievements(achievementList);
        }

        // Lưu system requirements nếu có
        if (dto.getSystemRequirements() != null) {
            var reqDto = dto.getSystemRequirements();
            SystemRequirements req = new SystemRequirements();
            req.setOs(reqDto.getOs());
            req.setProcessor(reqDto.getProcessor());
            req.setMemory(reqDto.getMemory());
            req.setGraphics(reqDto.getGraphics());
            req.setDirectx(reqDto.getDirectx());
            req.setStorage(reqDto.getStorage());
            req.setProduct(product);
            product.setSystemRequirements(req);
        }

        return productRepository.save(product).getId();
    }

    @Override
    @Transactional
    public void updateProduct(int id, ProductRequestDTO dto) {
        Product product = getById(id);
        Category category = categoryService.getByName(dto.getCategoryName());
        product.setCategory(category);
        product.setDetail(dto.getDetail());
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setImg(dto.getImg());
        product.setDeveloper(dto.getDeveloper());
        product.setPublisher(dto.getPublisher());
        product.setReleaseDate(dto.getReleaseDate());
        product.setPlatform(dto.getPlatform());
        product.setAgeRating(dto.getAgeRating());
        product.setDiscount(dto.getDiscount());
        product.setEpicRewards(dto.getEpicRewards());
        product.setRefundType(dto.getRefundType());

        // XÓA entity con cũ trước khi set mới
        mediaRepository.deleteAllByProduct(product);
        dlcRepository.deleteAllByProduct(product);
        achievementRepository.deleteAllByProduct(product);

        // Set media mới
        if (dto.getMedia() != null) {
            List<Media> mediaList = dto.getMedia().stream()
                    .map(m -> {
                        Media media = new Media();
                        media.setType(m.getType());
                        media.setUrl(m.getUrl());
                        media.setProduct(product);
                        return media;
                    }).collect(Collectors.toList());
            product.setMedia(mediaList);
        } else {
            product.setMedia(new ArrayList<>());
        }

        // Set dlcs mới
        if (dto.getDlcs() != null) {
            List<Dlc> dlcList = dto.getDlcs().stream()
                    .map(d -> {
                        Dlc dlc = new Dlc();
                        dlc.setName(d.getName());
                        dlc.setImg(d.getImg());
                        dlc.setPrice(d.getPrice());
                        dlc.setProduct(product);
                        return dlc;
                    }).collect(Collectors.toList());
            product.setDlcs(dlcList);
        } else {
            product.setDlcs(new ArrayList<>());
        }

        // Set achievements mới
        if (dto.getAchievements() != null) {
            List<Achievement> achievementList = dto.getAchievements().stream()
                    .map(a -> {
                        Achievement ach = new Achievement();
                        ach.setName(a.getName());
                        ach.setIcon(a.getIcon());
                        ach.setXp(a.getXp());
                        ach.setProduct(product);
                        return ach;
                    }).collect(Collectors.toList());
            product.setAchievements(achievementList);
        } else {
            product.setAchievements(new ArrayList<>());
        }

        // Set system requirements mới
        if (dto.getSystemRequirements() != null) {
            var reqDto = dto.getSystemRequirements();
            SystemRequirements req = product.getSystemRequirements();
            if (req == null) {
                req = new SystemRequirements();
                req.setProduct(product);
            }
            req.setOs(reqDto.getOs());
            req.setProcessor(reqDto.getProcessor());
            req.setMemory(reqDto.getMemory());
            req.setGraphics(reqDto.getGraphics());
            req.setDirectx(reqDto.getDirectx());
            req.setStorage(reqDto.getStorage());
            req.setProduct(product);
            product.setSystemRequirements(req);
        } else {
            product.setSystemRequirements(null);
        }

        productRepository.save(product);
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::toProductResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO getProductById(int id) {
        Product product = getById(id);

        // Lấy DLC từ DB
        List<DlcDTO> dlcs = dlcRepository.findByProductId(product.getId()).stream()
                .map(dlc -> DlcDTO.builder()
                        .id(dlc.getId())
                        .name(dlc.getName())
                        .img(dlc.getImg())
                        .price(dlc.getPrice())
                        .build())
                .toList();

        // Lấy Achievement từ DB
        List<AchievementDTO> achievements = achievementRepository.findByProductId(product.getId()).stream()
                .map(a -> AchievementDTO.builder()
                        .id(a.getId())
                        .name(a.getName())
                        .icon(a.getIcon())
                        .xp(a.getXp())
                        .build())
                .toList();

        // Lấy Media từ Product
        List<MediaDTO> media = product.getMedia() != null
                ? product.getMedia().stream()
                        .map(m -> MediaDTO.builder().type(m.getType()).url(m.getUrl()).build())
                        .toList()
                : List.of();

        // Chuyển đổi SystemRequirements sang DTO
        SystemRequirementsDTO sysReq = null;
        if (product.getSystemRequirements() != null) {
            var req = product.getSystemRequirements();
            sysReq = SystemRequirementsDTO.builder()
                    .os(req.getOs())
                    .processor(req.getProcessor())
                    .memory(req.getMemory())
                    .graphics(req.getGraphics())
                    .directx(req.getDirectx())
                    .storage(req.getStorage())
                    .build();
        }

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .img(product.getImg())
                .price(product.getPrice())
                .detail(product.getDetail())
                .categoryName(product.getCategory().getName())
                .media(media)
                .systemRequirements(sysReq)
                .developer(product.getDeveloper())
                .publisher(product.getPublisher())
                .releaseDate(product.getReleaseDate())
                .platform(product.getPlatform())
                .ageRating(product.getAgeRating())
                .discount(product.getDiscount())
                .epicRewards(product.getEpicRewards())
                .refundType(product.getRefundType())
                .dlcs(dlcs)
                .achievements(achievements)
                .build();
    }

    @Override
    public List<ProductResponseDTO> getRelatedProducts(int productId) {
        Product product = getById(productId);
        if (product == null)
            return List.of();
        List<Product> related = productRepository.findByCategoryId(product.getCategory().getId());
        return related.stream()
                .filter(p -> !p.getId().equals(productId))
                .map(this::toProductResponseDTO)
                .collect(Collectors.toList());
    }

    // Helper chuyển Product sang ProductResponseDTO (đủ trường)
    private ProductResponseDTO toProductResponseDTO(Product product) {
        // Lấy DLC từ DB
        List<DlcDTO> dlcs = dlcRepository.findByProductId(product.getId()).stream()
                .map(dlc -> DlcDTO.builder()
                        .id(dlc.getId())
                        .name(dlc.getName())
                        .img(dlc.getImg())
                        .price(dlc.getPrice())
                        .build())
                .toList();

        // Lấy Achievement từ DB
        List<AchievementDTO> achievements = achievementRepository.findByProductId(product.getId()).stream()
                .map(a -> AchievementDTO.builder()
                        .id(a.getId())
                        .name(a.getName())
                        .icon(a.getIcon())
                        .xp(a.getXp())
                        .build())
                .toList();

        // Lấy Media từ Product
        List<MediaDTO> media = product.getMedia() != null
                ? product.getMedia().stream()
                        .map(m -> MediaDTO.builder().type(m.getType()).url(m.getUrl()).build())
                        .toList()
                : List.of();

        // Chuyển đổi SystemRequirements sang DTO
        SystemRequirementsDTO sysReq = null;
        if (product.getSystemRequirements() != null) {
            var req = product.getSystemRequirements();
            sysReq = SystemRequirementsDTO.builder()
                    .os(req.getOs())
                    .processor(req.getProcessor())
                    .memory(req.getMemory())
                    .graphics(req.getGraphics())
                    .directx(req.getDirectx())
                    .storage(req.getStorage())
                    .build();
        }

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .img(product.getImg())
                .price(product.getPrice())
                .detail(product.getDetail())
                .categoryName(product.getCategory().getName())
                .media(media)
                .systemRequirements(sysReq)
                .developer(product.getDeveloper())
                .publisher(product.getPublisher())
                .releaseDate(product.getReleaseDate())
                .platform(product.getPlatform())
                .ageRating(product.getAgeRating())
                .discount(product.getDiscount())
                .epicRewards(product.getEpicRewards())
                .refundType(product.getRefundType())
                .dlcs(dlcs)
                .achievements(achievements)
                .build();
    }

    @Override
    public List<ProductResponseDTO> findByCategoryId(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::toProductResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDTO> findByNameContainingIgnoreCase(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(this::toProductResponseDTO)
                .collect(Collectors.toList());
    }

    public Product getById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Page<ProductResponseDTO> advancedSearch(String name, String category, Double minPrice, Double maxPrice,
            int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.advancedSearch(name, category, minPrice, maxPrice, pageable);
        return productPage.map(this::toProductResponseDTO);
    }

}
