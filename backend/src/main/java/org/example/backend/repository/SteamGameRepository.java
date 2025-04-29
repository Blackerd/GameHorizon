package org.example.backend.repository;

import org.example.backend.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SteamGameRepository extends JpaRepository<Game, Long> {
    boolean existsByAppId(Integer appId);
}