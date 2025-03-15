package com.sai.Movies.Config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dejpyeznc");
        config.put("api_key", "324547183865179");
        config.put("api_secret", "D2LvldiRaD5dkIIGAMpUvyGPt90");
        return new Cloudinary(config);
    }
}
