package com.webgames.suendenbock.repository;

import com.webgames.suendenbock.model.GameStats;
import com.webgames.suendenbock.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameStatsRepository extends JpaRepository<GameStats, Long> {
    
    List<GameStats> findByUserOrderByCompletedAtDesc(User user);
    
    List<GameStats> findTop10ByOrderByCorrectAnswersDescTimeSpentSecondsAsc();
}
