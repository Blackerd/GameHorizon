package org.example.backend.dto.request;

import lombok.Data;

@Data
public class AchievementRequestDTO {
    private String name;
    private String icon;
    private int xp;
}
