import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    language: "",
    rating: "",
    genre: "",
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (location.search) {
      fetchMovies();
    } else {
      setMovies([]); // Default no movies displayed
    }
  }, [location.search]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movies/filter${location.search}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const filterParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filterParams.append(key, filters[key]);
      }
    });

    navigate(`/filter?${filterParams.toString()}`);
  };

  return (
    <div className="filter-movies-container">
      <h2>Filter Movies</h2>

      <div className="filter-group">
        <h3>Language</h3>
        <select name="language" onChange={handleFilterChange} value={filters.language}>
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
        </select>
      </div>

      <div className="filter-group">
        <h3>Rating</h3>
        <select name="rating" onChange={handleFilterChange} value={filters.rating}>
          <option value="">Select Rating</option>
          <option value="10">10 Stars</option>
          <option value="9">9 Stars</option>
          <option value="8">8 Stars</option>
          <option value="7">7 Stars</option>
        </select>
      </div>

      <div className="filter-group">
        <h3>Genre</h3>
        <select name="genre" onChange={handleFilterChange} value={filters.genre}>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>

      <button className="apply-filters" onClick={applyFilters}>Apply Filters</button>

      {/* Display Filtered Movies */}
      <div className="filter-movies-container">
        <h2>Filtered Movies</h2>
        <div className="filter-movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="filter-movie-card">
                <img
                 src={movie.poster_url}
                  alt={movie.title}
                  className="movie-image"
                  onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback Image
                  onClick={() => navigate(`/movies/${movie.id}`)}
                />
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
                <p>Language: {movie.language}</p>
                <p>Rating: {movie.rating}</p>
                {/* <div className="filter-download-icon">
                  <FontAwesomeIcon icon={faDownload} />
                </div> */}
              </div>
            ))
          ) : (
            <p>No movies found. Apply filters to see results.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
