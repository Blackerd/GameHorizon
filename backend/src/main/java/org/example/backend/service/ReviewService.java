package org.example.backend.service;

import org.example.backend.model.Review;
import java.util.List;


public interface ReviewService {
    Review addReview(Review review);
    List<Review> getReviewsByProduct(Long productId);
}