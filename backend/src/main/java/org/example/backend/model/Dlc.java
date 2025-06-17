package org.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Dlc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String img;
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}