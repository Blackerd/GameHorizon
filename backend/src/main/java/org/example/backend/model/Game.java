package org.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "games")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "app_id", unique = true)
    private Integer appId;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    private Integer price; // giá theo cent (nếu có), free = 0
}
