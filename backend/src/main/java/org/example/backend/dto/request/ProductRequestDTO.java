package org.example.backend.dto.request;

import lombok.*;
import java.io.Serializable;
import java.util.List;

@Data
public class ProductRequestDTO implements Serializable {
    private String name;
    private String img;
    private int price;
    private String categoryName;
    private String detail;

    private String developer;
    private String publisher;
    private String releaseDate;
    private String platform;
    private String ageRating;
    private Double discount;
    private String epicRewards;
    private String refundType;

    private List<MediaRequestDTO> media;
    private List<DlcRequestDTO> dlcs;
    private List<AchievementRequestDTO> achievements;
    private SystemRequirementsRequestDTO systemRequirements;
}