package org.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SystemRequirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String os;
    private String processor;
    private String memory;
    private String graphics;
    private String directx;
    private String storage;
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
}