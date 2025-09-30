package com.webgames.suendenbock.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameStatsRequest {
    
    @NotNull(message = "Questions answered is required")
    private Integer questionsAnswered;
    
    @NotNull(message = "Correct answers is required")
    private Integer correctAnswers;
    
    @NotNull(message = "Time spent is required")
    private Long timeSpentSeconds;
    
    @Builder.Default
    private Integer hintsUsed = 0;
}
