package org.example.backend.controller;

import org.example.backend.model.Review;
import org.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.backend.model.Customer;
import org.example.backend.repository.CustomerRepository;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.backend.repository.CustomerRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.backend.model.Customer;
import org.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.backend.repository.CustomerRepository;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping(consumes = { "application/json", "application/json;charset=UTF-8" })
    public Review addReview(@RequestBody Review review, Principal principal) {
        String username = principal.getName();
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        review.setCustomer(customer);
        return reviewService.addReview(review);
    }

    @GetMapping("/product/{productId}")
    public List<Review> getReviews(@PathVariable Long productId) {
        return reviewService.getReviewsByProduct(productId);
    }

    @GetMapping("/product/{productId}/summary")
    public Map<String, Object> getReviewSummary(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProduct(productId);
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);
        return Map.of(
                "average", avg,
                "count", reviews.size());
    }
}