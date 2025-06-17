package org.example.backend.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.*;

@Builder
@Data
public class ProductResponseDTO {
    private int id;
    private String name;
    private String img;
    private Integer price;
    private String categoryName;
    private String detail;
    private List<MediaDTO> media;
    private SystemRequirementsDTO systemRequirements;
    private String developer;
    private String publisher;
    private String releaseDate;
    private String platform;
    private String ageRating;
    private Double discount;
    private String epicRewards;
    private String refundType;
    private List<DlcDTO> dlcs;
    private List<AchievementDTO> achievements;
}
