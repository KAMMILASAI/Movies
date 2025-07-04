import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]); 
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get URL params

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [location.search, movies]); // Apply filters whenever URL changes or movies are fetched

  
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovies(response.data);

      setFilteredMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(location.search);
    const selectedLanguages = params.get("language")?.split(",") || [];
    const selectedRatings = params.get("rating")?.split(",") || [];
    const selectedGenres = params.get("genre")?.split(",") || [];

    let filtered = movies;

    if (selectedLanguages.length > 0 && selectedLanguages[0] !== "") {
      filtered = filtered.filter((movie) => selectedLanguages.includes(movie.language));
    }
    if (selectedRatings.length > 0 && selectedRatings[0] !== "") {
      filtered = filtered.filter((movie) => selectedRatings.includes(movie.rating.toString()));
    }
    if (selectedGenres.length > 0 && selectedGenres[0] !== "") {
      filtered = filtered.filter((movie) => selectedGenres.includes(movie.genre));
    }

    setFilteredMovies(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTitle(value);

    if (value === "") {
      applyFilters(); // Reapply filters when search is cleared
    } else {
      const searchedMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(value)
      );
      setFilteredMovies(searchedMovies);
    }
  };

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search by movie title..."
        value={searchTitle}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <img
                src={movie.poster_url}
                alt={movie.post}
                className="movie-image"
              />
              <h3>{movie.title}</h3>
              <p>Genre: {movie.genre}</p>
              <p>Language: {movie.language}</p>
              <p>Rating: {movie.rating}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
