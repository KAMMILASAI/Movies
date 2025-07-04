import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  // useCallback ensures the function reference doesn't change unnecessarily
  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movies/id/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]); // No ESLint warning now

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setDownloadProgress(progress);
  
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        setDownloadComplete(true);
  
        // Store downloaded movie in localStorage
        const downloadedMovies = JSON.parse(localStorage.getItem("downloadedMovies")) || [];
        const newMovie = { 
          id: movie.id, 
          title: movie.title, 
          poster_url: movie.poster_url // Include the poster_url
        };
  
        if (!downloadedMovies.some(m => m.id === movie.id)) {
          downloadedMovies.push(newMovie);
          localStorage.setItem("downloadedMovies", JSON.stringify(downloadedMovies));
  
          // Notify Downloads page to update
          window.dispatchEvent(new Event("movieDownloaded"));
        }
      }
    }, 200);
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-details-container">
      <h1>{movie.title}</h1>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong>{movie.genre}</p>
      <p><strong>Actors:</strong>{movie.actors}</p>
      <p><strong>Language:</strong>{movie.language}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <video controls className="movie-video" >
        <source src={movie.trailer_url} type="video/mp4" />
        Your browser does not support the video.
      </video>

      <p><strong>Note:</strong>This website is only for showcasing movie trailers and providing detailed movie descriptions. It does not host or stream full movies, and there is no option to download movies from here.</p>

<p>You can explore various movie details, including information about the director, actors, box office earnings, rating, and language. These details are provided to give you a better understanding of the movies before you decide to watch them elsewhere.</p>

<p>Additionally, you may notice a download button on the site. However, please note that this button is purely for design purposes and does not actually allow you to download anything. It is just a fake function with no real download feature.</p>

<p>This website is meant for informational and entertainment purposes only, giving you access to trailers and movie descriptions without offering full movie streaming or downloading options.</p>
      
     

      {/* Download Button */}
      <div className="download-container">
        <button onClick={handleDownload} className="download-button" disabled={isDownloading || downloadComplete}>
          {downloadComplete ? "Download Complete!" : isDownloading ? `Downloading... ${downloadProgress}%` : "Download"}
          <FontAwesomeIcon icon={downloadComplete ? faCheckCircle : faDownload} style={{ marginLeft: "8px" }} />
        </button>
  
        {isDownloading && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${downloadProgress}%` }}></div>
          </div>
        )}
      </div>
      
    </div>
    
  );
};

export default MovieDetails;
