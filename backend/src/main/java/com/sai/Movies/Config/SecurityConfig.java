
package com.sai.Movies.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://varma-movies.netlify.app") // ✅ Allow React frontend
                        .allowedMethods("*") // ✅ Allow all HTTP methods (GET, POST, PUT, DELETE)
                        .allowedHeaders("*"); // ✅ Allow all headers
            }
        };
    }
    @Bean
    public WebMvcConfigurer corsConfigurer1() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/movies/**").allowedOrigins("*");
            }
        };
    }




}
