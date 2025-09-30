package com.webgames.suendenbock.aop;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Aspect
@Component
@RequiredArgsConstructor
public class RateLimitingAspect {
    
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();
    
    @Around("@annotation(rateLimited)")
    public Object rateLimit(ProceedingJoinPoint joinPoint, RateLimited rateLimited) throws Throwable {
        String key = getClientKey();
        Bucket bucket = resolveBucket(key, rateLimited);
        
        if (bucket.tryConsume(1)) {
            return joinPoint.proceed();
        } else {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Rate limit exceeded");
        }
    }
    
    private Bucket resolveBucket(String key, RateLimited rateLimited) {
        return cache.computeIfAbsent(key, k -> createBucket(rateLimited));
    }
    
    private Bucket createBucket(RateLimited rateLimited) {
        Refill refill = Refill.intervally(
                rateLimited.refillTokens(),
                Duration.ofSeconds(rateLimited.refillDurationSeconds())
        );
        Bandwidth limit = Bandwidth.classic(rateLimited.capacity(), refill);
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
    
    private String getClientKey() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String clientIp = request.getRemoteAddr();
            String username = request.getUserPrincipal() != null ? request.getUserPrincipal().getName() : "anonymous";
            return clientIp + ":" + username;
        }
        return "unknown";
    }
}
