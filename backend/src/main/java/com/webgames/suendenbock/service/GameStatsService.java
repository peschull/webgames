package com.webgames.suendenbock.service;

import com.webgames.suendenbock.dto.GameStatsRequest;
import com.webgames.suendenbock.model.GameStats;
import com.webgames.suendenbock.model.User;
import com.webgames.suendenbock.repository.GameStatsRepository;
import com.webgames.suendenbock.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameStatsService {
    
    private final GameStatsRepository gameStatsRepository;
    private final UserRepository userRepository;
    
    @Transactional
    @CacheEvict(value = "leaderboard", allEntries = true)
    public GameStats saveGameStats(String username, GameStatsRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        GameStats stats = GameStats.builder()
                .user(user)
                .questionsAnswered(request.getQuestionsAnswered())
                .correctAnswers(request.getCorrectAnswers())
                .timeSpentSeconds(request.getTimeSpentSeconds())
                .hintsUsed(request.getHintsUsed())
                .build();
        
        return gameStatsRepository.save(stats);
    }
    
    @Cacheable(value = "userStats", key = "#username")
    public List<GameStats> getUserStats(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return gameStatsRepository.findByUserOrderByCompletedAtDesc(user);
    }
    
    @Cacheable(value = "leaderboard")
    public List<GameStats> getLeaderboard() {
        return gameStatsRepository.findTop10ByOrderByCorrectAnswersDescTimeSpentSecondsAsc();
    }
}
