package com.sai.Movies.DAO;

import com.sai.Movies.Entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesRepo extends JpaRepository<Movies, Integer> {
//    List<Movies> findByTitle(String title);
}
