package com.webgames.suendenbock.repository;

import com.webgames.suendenbock.model.RefreshToken;
import com.webgames.suendenbock.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByToken(String token);
    
    void deleteByUser(User user);
    
    void deleteByToken(String token);
}
