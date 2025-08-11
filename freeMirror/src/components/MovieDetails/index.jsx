import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css';
import { PaginationContext } from '../../context/PaginationContextProvider';

const normalizeMediaItem = (item, type) => {
  const mediaType = type || item.media_type || 'movie'; 

  return {
    id: item.id,
    title: mediaType === "movie" ? item.title : item.name,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    overview: item.overview,
    release_date: mediaType === "movie" ? item.release_date : item.first_air_date,
    vote_average: item.vote_average,
    vote_count: item.vote_count,
    original_language: item.original_language,
    popularity: item.popularity,
    media_type: mediaType,
  };
};


const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const movieId = Number(id);

  const { watchLater, addToWatchLater, removeFromWatchLater } = useContext(PaginationContext);

  useEffect(() => {
    const fetchMovieById = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9139705d9f63345831e93b1b5450a0da&language=en-US`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieById();
  }, [id]);
  const isPresentAtWatchLater = watchLater.some((m) => m.id === movieId);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <div
        className="backdrop-container"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="overlay">
          <div className="details-content">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="tagline">{movie.original_title}</p>

            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <p className="movie-overview">{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            <p><strong>Votes:</strong> {movie.vote_count}</p>
            <p><strong>Language:</strong> {movie.original_language?.toUpperCase()}</p>
            <p><strong>Popularity:</strong> {movie.popularity}</p>

            <div className="button-container">
              <Link to="/" className="back-link">⬅ Back to Home</Link>

              {isPresentAtWatchLater ? (
                <div className="addedBro">
                  <Link to="/wishlist" className="back-link">📋 View Watchlist</Link>
                  <button
                    className="watchlater"
                    onClick={() => removeFromWatchLater(normalizeMediaItem(movie,'movie'))}
                  >
                    ❌ Remove from WatchLater
                  </button>
                </div>
              ) : (
                <button
                  className="watchlater"
                  onClick={() => addToWatchLater(normalizeMediaItem(movie,'movie'))}
                >
                  ➕ Add to WatchLater
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
