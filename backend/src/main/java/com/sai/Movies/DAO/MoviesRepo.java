package com.sai.Movies.DAO;

import com.sai.Movies.Entity.Movies;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MoviesRepo extends MongoRepository<Movies, String> {
}
