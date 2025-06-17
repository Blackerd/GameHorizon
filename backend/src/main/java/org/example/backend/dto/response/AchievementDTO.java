package org.example.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AchievementDTO {
    private int id;
    private String name;
    private String icon;
    private int xp;
}