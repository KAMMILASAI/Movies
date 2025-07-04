import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Downloads = () => {
  const [downloadedMovies, setDownloadedMovies] = useState([]);

  // Fetch downloaded movies from localStorage
  const fetchDownloads = () => {
    const movies = JSON.parse(localStorage.getItem("downloadedMovies")) || [];
    console.log(movies); // Debugging: Check the data in the console
    setDownloadedMovies(movies);
  };

  useEffect(() => {
    fetchDownloads();
    
    // Listen for updates when a new movie is downloaded
    const handleMovieDownload = () => {
      fetchDownloads();
    };

    window.addEventListener("movieDownloaded", handleMovieDownload);

    return () => {
      window.removeEventListener("movieDownloaded", handleMovieDownload);
    };
  }, []);

  // Delete a movie from downloads
  const handleDelete = (movieId) => {
    const updatedMovies = downloadedMovies.filter((movie) => movie.id !== movieId);
    localStorage.setItem("downloadedMovies", JSON.stringify(updatedMovies));
    setDownloadedMovies(updatedMovies);
  };

  return (
    <div className="downloads-container">
      <h1>Downloaded Movies</h1>

      {downloadedMovies.length === 0 ? (
        <p className="no-movies">No movies downloaded yet.</p>
      ) : (
        <div className="movies-grid">
          {downloadedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-info">
                <Link to={`/movies/${movie.id}`} className="movie-title">
                  <h2>{movie.title}</h2>
                
                <img 
                src={movie.poster_url} 
                alt={movie.title} 
                className="movie-image"
                onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
              />
              </Link>
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;