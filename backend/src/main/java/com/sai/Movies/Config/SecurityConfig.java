package com.sai.Movies.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
//import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.oidc.user.OidcUser;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("https://varma-movies.netlify.app")); // Allow frontend
//        configuration.setAllowedOrigins(List.of("https://varma-movies.netlify.app"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://varma-movies.netlify.app/") // ✅ Allow React frontend
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
//   //Auth2
//   @Bean
//   public SecurityFilterChain securityFilterChain1(HttpSecurity http) throws Exception {
//       http
//               .csrf(csrf -> csrf.disable())
//               .authorizeHttpRequests(auth -> auth
//                       .requestMatchers("/api/users/**").permitAll()
//                       .anyRequest().authenticated()
//               )
//               .oauth2Login(oauth2 -> oauth2
//                       .userInfoEndpoint(userInfo -> userInfo
//                               .oidcUserService(oidcUserService())
//                               .userService(oAuth2UserService())
//                       )
//               );
//       return http.build();
//   }
//
//    @Bean
//    public OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
//        OidcUserService delegate = new OidcUserService();
//        return userRequest -> {
//            OidcUser oidcUser = delegate.loadUser(userRequest);
//            return oidcUser;
//        };
//    }
//
//    @Bean
//    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService() {
//        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
//        return userRequest -> {
//            OAuth2User oAuth2User = delegate.loadUser(userRequest);
//            return oAuth2User;
//        };
//    }
}
