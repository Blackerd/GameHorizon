package org.example.backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.response.GameResponseDTO;
import org.example.backend.model.Game;
import org.example.backend.repository.SteamGameRepository;
import org.example.backend.service.SteamGameService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SteamGameServiceImpl implements SteamGameService {

    private final SteamGameRepository gameRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String STEAM_API_URL = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";

    @Override
    public List<GameResponseDTO> fetchAndSaveSteamGames(int limit) {
        List<GameResponseDTO> result = new ArrayList<>();

        try {
            String json = restTemplate.getForObject(STEAM_API_URL, String.class);
            JsonNode root = objectMapper.readTree(json);
            JsonNode apps = root.path("applist").path("apps");

            int count = 0;
            Iterator<JsonNode> iterator = apps.elements();
            while (iterator.hasNext() && count < limit) {
                JsonNode app = iterator.next();
                int appId = app.get("appid").asInt();
                String name = app.get("name").asText();

                if (gameRepository.existsByAppId(appId)) continue;

                Game game = Game.builder()
                        .appId(appId)
                        .name(name)
                        .description(fetchGameDescription(appId))
                        .imageUrl("https://cdn.cloudflare.steamstatic.com/steam/apps/" + appId + "/header.jpg")
                        .price(0)
                        .build();

                Game saved = gameRepository.save(game);

                result.add(GameResponseDTO.builder()
                        .id(saved.getId())
                        .appId(saved.getAppId())
                        .name(saved.getName())
                        .description(saved.getDescription())
                        .imageUrl(saved.getImageUrl())
                        .price(saved.getPrice())
                        .build()
                );
                count++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    private String fetchGameDescription(int appId) {
        try {
            String url = "https://store.steampowered.com/api/appdetails?appids=" + appId;
            String json = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(json);
            JsonNode appNode = root.path(String.valueOf(appId));
            if (appNode.path("success").asBoolean()) {
                return appNode.path("data").path("short_description").asText("Đang cập nhật...");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Đang cập nhật...";
    }


    @Override
    public List<GameResponseDTO> getAllGames() {
        return gameRepository.findAll().stream()
                .map(game -> GameResponseDTO.builder()
                        .id(game.getId())
                        .appId(game.getAppId())
                        .name(game.getName())
                        .description(game.getDescription())
                        .imageUrl(game.getImageUrl())
                        .price(game.getPrice())
                        .build())
                .collect(Collectors.toList());
    }


}
