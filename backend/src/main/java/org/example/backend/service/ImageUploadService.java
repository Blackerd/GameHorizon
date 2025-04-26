package org.example.backend.service;

import org.example.backend.dto.response.UrlResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadService {
    UrlResponse uploadImage(MultipartFile file);
}
