package org.example.backend.service.impl;

import org.example.backend.model.Review;
import org.example.backend.repository.ReviewRepository;
import org.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review addReview(Review review) {
        review.setCreatedAt(System.currentTimeMillis());
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }
}