package org.example.backend.service;

import org.example.backend.dto.response.GameResponseDTO;

import java.util.List;

public interface SteamGameService {
    List<GameResponseDTO> fetchAndSaveSteamGames(int limit);
    List<GameResponseDTO> getAllGames();
}
