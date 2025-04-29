package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.response.GameResponseDTO;
import org.example.backend.service.SteamGameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/steam")
@RequiredArgsConstructor
public class SteamGameController {

    private final SteamGameService steamGameService;

    @GetMapping("/fetch")
    public List<GameResponseDTO> fetchGamesFromSteam(@RequestParam(defaultValue = "10") int limit) {
        return steamGameService.fetchAndSaveSteamGames(limit);
    }

    @GetMapping("/import")
    public String importSteamGames(@RequestParam(defaultValue = "50") int limit) {
        steamGameService.fetchAndSaveSteamGames(limit);
        return "Imported " + limit + " games from Steam successfully.";
    }

}
