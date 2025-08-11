import React, { useEffect, useState } from 'react';
import './index.css';

const API_KEY = '9139705d9f63345831e93b1b5450a0da';

const BannerSection = () => {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState('');

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const movieData = await movieRes.json();
        console.log(movieData);
        const selectedMovie = movieData.results[13];
        setMovie(selectedMovie);
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (err) {
        console.error('Error fetching TMDB data:', err);
      }
    }

    fetchMovieData();
  }, []);

  return (
    <div className="banner-container">
      {videoKey && (
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&controls=0&modestbranding=1&showinfo=0`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      )}
      {movie && (
        <div className="banner-content">
          <h1 className="banner-title">{movie.title}</h1>
          <hr className="custom-hr" />
          <p className="banner-overview">{movie.overview}</p>
          <p className="banner-date">Release: {movie.release_date}</p>
        </div>
      )}
    </div>
  );
};

export default BannerSection;
