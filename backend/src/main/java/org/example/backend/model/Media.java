package org.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type; // "image" hoặc "video"
    private String url;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}