package com.webgames.suendenbock.controller;

import com.webgames.suendenbock.aop.RateLimited;
import com.webgames.suendenbock.dto.GameStatsRequest;
import com.webgames.suendenbock.model.GameStats;
import com.webgames.suendenbock.service.GameStatsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {
    
    private final GameStatsService gameStatsService;
    
    @PostMapping("/stats")
    @RateLimited(capacity = 50, refillTokens = 5, refillDurationSeconds = 60)
    public ResponseEntity<GameStats> saveStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody GameStatsRequest request) {
        return ResponseEntity.ok(gameStatsService.saveGameStats(userDetails.getUsername(), request));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<List<GameStats>> getUserStats(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(gameStatsService.getUserStats(userDetails.getUsername()));
    }
    
    @GetMapping("/leaderboard")
    public ResponseEntity<List<GameStats>> getLeaderboard() {
        return ResponseEntity.ok(gameStatsService.getLeaderboard());
    }
}
