package com.webgames.suendenbock.service;

import com.webgames.suendenbock.dto.RegisterRequest;
import com.webgames.suendenbock.model.User;
import com.webgames.suendenbock.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class AuthServiceTest {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserRepository userRepository;
    
    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }
    
    @Test
    void shouldRegisterNewUser() {
        RegisterRequest request = RegisterRequest.builder()
                .username("testuser")
                .email("test@example.com")
                .password("password123")
                .build();
        
        var response = authService.register(request);
        
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isNotBlank();
        assertThat(response.getRefreshToken()).isNotBlank();
        assertThat(response.getUsername()).isEqualTo("testuser");
        
        User user = userRepository.findByUsername("testuser").orElseThrow();
        assertThat(user.getEmail()).isEqualTo("test@example.com");
        assertThat(user.isEmailVerified()).isFalse();
    }
    
    @Test
    void shouldNotRegisterDuplicateUsername() {
        RegisterRequest request1 = RegisterRequest.builder()
                .username("testuser")
                .email("test1@example.com")
                .password("password123")
                .build();
        
        authService.register(request1);
        
        RegisterRequest request2 = RegisterRequest.builder()
                .username("testuser")
                .email("test2@example.com")
                .password("password456")
                .build();
        
        assertThatThrownBy(() -> authService.register(request2))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Username already exists");
    }
}
