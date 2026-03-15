package com.example.smiti.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // Merged Origins: React (3000) and Swagger/Other (6060)
                        .allowedOrigins("http://localhost:3000", "http://localhost:6060")
                        // Full list of methods including OPTIONS for pre-flight requests
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        // Allow all headers from the frontend
                        .allowedHeaders("*")
                        // Crucial for JWT and Cookies
                        .allowCredentials(true)
                        // Ensure the frontend can actually see the Authorization header
                        .exposedHeaders("Authorization", "Content-Disposition");
            }
        };
    }
}