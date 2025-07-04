package com.sai.Movies.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data  // Lombok will generate getters, setters, equals, hashCode, and toString
@Document(collection = "movies")  // Marks this as a MongoDB collection
public class Movies {

    @Id
    private String id;  // MongoDB typically uses String (ObjectId)

    private String title;
    private String description;
    private String genre;
    private BigDecimal rating;
    private String director;
    private String language;
    private String poster_url;  // Follow camelCase naming convention
    private String trailer_url;
    private Long box_office;  // MongoDB prefers Long over BigInteger
    private String actors;

}
