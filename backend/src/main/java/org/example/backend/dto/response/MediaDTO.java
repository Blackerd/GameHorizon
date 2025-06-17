package org.example.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MediaDTO {
    private String type; // "image" hoặc "video"
    private String url;
}