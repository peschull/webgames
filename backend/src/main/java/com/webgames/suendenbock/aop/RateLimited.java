package com.webgames.suendenbock.aop;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimited {
    int capacity() default 100;
    int refillTokens() default 10;
    int refillDurationSeconds() default 1;
}
