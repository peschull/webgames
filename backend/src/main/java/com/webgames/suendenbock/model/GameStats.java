package com.webgames.suendenbock.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "game_stats")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameStats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "questions_answered")
    private int questionsAnswered;
    
    @Column(name = "correct_answers")
    private int correctAnswers;
    
    @Column(name = "time_spent_seconds")
    private long timeSpentSeconds;
    
    @Column(name = "hints_used")
    private int hintsUsed;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }
}
