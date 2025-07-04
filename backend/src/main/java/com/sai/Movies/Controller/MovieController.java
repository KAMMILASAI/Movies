package com.sai.Movies.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sai.Movies.DAO.MoviesRepo;
import com.sai.Movies.Entity.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MoviesRepo moviesRepo;
    @Autowired
    private Cloudinary cloudinary;


    @GetMapping
    public List<Movies> findall() {
        return moviesRepo.findAll();
    }

        @GetMapping("/id/{id}")
    public Movies getmovie(@PathVariable("id") String id) {
        Optional<Movies> movie = moviesRepo.findById(id);
        if (movie.isPresent()) {
            return movie.get();
        } else {
            throw new RuntimeException("Movie not found for the given ID: " + id);
        }
    }

    @GetMapping("/filter")
    public List<Movies> filterMovies(
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) Double rating) {

        List<Movies> movies = moviesRepo.findAll();

        if (language != null && !language.isEmpty()) {
            movies = movies.stream()
                    .filter(movie -> movie.getLanguage() != null && movie.getLanguage().equalsIgnoreCase(language))
                    .collect(Collectors.toList());
        }
        if (genre != null && !genre.isEmpty()) {
            movies = movies.stream()
                    .filter(movie -> movie.getGenre() != null && movie.getGenre().equalsIgnoreCase(genre))
                    .collect(Collectors.toList());
        }
        if (rating != null) {
            BigDecimal ratingValue = BigDecimal.valueOf(rating);
            movies = movies.stream()
                    .filter(movie -> movie.getRating() != null && movie.getRating().compareTo(ratingValue) >= 0)
                    .collect(Collectors.toList());
        }
        return movies;
    }


    @PostMapping
    public ResponseEntity<String> addMovie(@RequestBody Movies movie) {
        Movies savedMovie = moviesRepo.save(movie);
        return ResponseEntity.ok("Movie added successfully! ID: " + savedMovie.getId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable("id") String id, @RequestBody Movies updatedMovie) {
        Optional<Movies> existingMovie = moviesRepo.findById(id);
        if (existingMovie.isPresent()) {
            Movies movie = existingMovie.get();
            movie.setTitle(updatedMovie.getTitle());
            movie.setDescription(updatedMovie.getDescription());
            movie.setGenre(updatedMovie.getGenre());
            movie.setRating(updatedMovie.getRating());
            movie.setDirector(updatedMovie.getDirector());
            movie.setLanguage(updatedMovie.getLanguage());
            movie.setPoster_url(updatedMovie.getPoster_url());
            movie.setTrailer_url(updatedMovie.getTrailer_url());
            movie.setBox_office(updatedMovie.getBox_office());
            movie.setActors(updatedMovie.getActors());
            moviesRepo.save(movie);
            return new ResponseEntity<>("Movie updated successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Movie not found! ID: " + id, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delectmovie(@PathVariable("id") String id){
        Optional<Movies> jobs = moviesRepo.findById(id);
        if(jobs.isPresent()) {
            moviesRepo.deleteById(id);
            return new ResponseEntity<>("Movie deleted successfully!", HttpStatus.OK);
        }
        else{
            throw new RuntimeException("job not found! ID:"+id);
        }
    }
    @PutMapping("/upload-image/{id}")
    public ResponseEntity<String> uploadImageFromUrl(@PathVariable String id, @RequestParam("imageUrl") String imageUrl) {
        try {
            Map uploadResult = cloudinary.uploader().upload(imageUrl, ObjectUtils.emptyMap());
            String cloudinaryUrl = (String) uploadResult.get("secure_url");
            Movies movie = moviesRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Movie not found!"));
            movie.setPoster_url(cloudinaryUrl);
            moviesRepo.save(movie);
            return ResponseEntity.ok("Image uploaded successfully! Cloudinary URL: " + cloudinaryUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<String> getMovieImage(@PathVariable String id) {
        Optional<Movies> movie = moviesRepo.findById(id);
        if (movie.isPresent() && movie.get().getPoster_url() != null) {
            System.out.println("Image URL: " + movie.get().getPoster_url()); // Log URL
            return ResponseEntity.ok(movie.get().getPoster_url());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }
    }
}