import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [newMovie, setNewMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [location.search, movies]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies", error);
      toast.error("Failed to fetch movies.");
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
      applyFilters();
    } else {
      const searchedMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(value)
      );
      setFilteredMovies(searchedMovies);
    }
  };

  const handleAddMovie = async () => {
    if (!newMovie) return;
    try {
      await axios.post("http://localhost:8080/movies", newMovie);
      fetchMovies();
      setNewMovie(null);
      toast.success("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie", error);
      toast.error("Failed to add movie.");
    }
  };

  const handleUpdateMovie = async () => {
    if (!editMovie) return;
    try {
      await axios.put(`http://localhost:8080/movies/${editMovie.id}`, editMovie);
      fetchMovies();
      setEditMovie(null);
      toast.success("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie", error);
      toast.error("Failed to update movie.");
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/movies/${id}`);
      fetchMovies();
      setDeleteConfirm(null);
      toast.success("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie", error);
      toast.error("Failed to delete movie.");
    }
  };

  return (
    <div className="movies-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <button
        onClick={() =>
          setNewMovie({
            title: "",
            description: "",
            genre: "",
            rating: "",
            director: "",
            language: "",
            poster_url: "",
            trailer_url: "",
            box_office: "",
            actors: "",
          })
        }
        className="add-movie-btn"
      >
        Add New Movie
      </button>

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
            <div key={movie.id} className="movie-card fade-in">
              <img src={movie.poster_url} alt={movie.title} className="movie-image" />
              <h3>{movie.title}</h3>
              <p>Genre: {movie.genre}</p>
              <p>Language: {movie.language}</p>
              <p>Rating: {movie.rating}</p>
              <button onClick={() => setEditMovie(movie)} className="update-button">Edit</button>
              <button onClick={() => setDeleteConfirm(movie)} className="delete-button">Delete</button>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>

      {/* Add Movie Form */}
      {newMovie && (
        <div className="overlay">
          <div className="edit-movie-form">
            <h2>Add Movie</h2>
            {Object.keys(newMovie).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={newMovie[key]}
                onChange={(e) => setNewMovie({ ...newMovie, [key]: e.target.value })}
              />
            ))}
            <button onClick={handleAddMovie} className="update-button">Add Movie</button>
            <button onClick={() => setNewMovie(null)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Movie Form */}
      {editMovie && (
        <div className="overlay">
          <div className="edit-movie-form">
            <h2>Edit Movie</h2>
            {Object.keys(editMovie).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={editMovie[key]}
                onChange={(e) => setEditMovie({ ...editMovie, [key]: e.target.value })}
              />
            ))}
            <button onClick={handleUpdateMovie} className="update-button">Update Movie</button>
            <button onClick={() => setEditMovie(null)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="overlay">
          <div className="delete-confirm-box">
            <h2>Are you sure you want to delete?</h2>
            <p><strong>{deleteConfirm.title}</strong> will be permanently removed.</p>
            <button onClick={() => handleDeleteMovie(deleteConfirm.id)} className="delete-button">Yes, Delete</button>
            <button onClick={() => setDeleteConfirm(null)} className="cancel-button">No, Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
