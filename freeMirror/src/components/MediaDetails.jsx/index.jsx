import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { PaginationContext } from "../../context/PaginationContextProvider";
import "./index.css";

// Normalize to make both movie & tv uniform
const normalizeMediaItem = (item, type = "movie") => ({
  id: item.id,
  title: type === "movie" ? item.title : item.name,
  poster_path: item.poster_path,
  backdrop_path: item.backdrop_path,
  overview: item.overview,
  release_date: type === "movie" ? item.release_date : item.first_air_date,
  vote_average: item.vote_average,
  vote_count: item.vote_count,
  original_language: item.original_language,
  popularity: item.popularity,
  media_type: type,
});

const MediaDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // get /movie or /tv
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const { watchLater, addToWatchLater, removeFromWatchLater } = useContext(PaginationContext);

  const mediaType = location.pathname.includes("/tv") ? "tv" : "movie";

  useEffect(() => {
    const fetchDetails = async () => {
      const apiKey = "9139705d9f63345831e93b1b5450a0da";
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=en-US`
      );
      const trailerRes = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`
      );

      const detailData = await detailsRes.json();
      const trailerData = await trailerRes.json();

      setDetails(detailData);
      const trailer = trailerData.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);
    };

    fetchDetails();
  }, [id, mediaType]);

  if (!details) return <h2 className="loading">Loading...</h2>;

  const isInWatchLater = watchLater.some((item) => item.id === details.id);

  const normalizedItem = normalizeMediaItem(details, mediaType);

  return (
    <div className="media-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <h1 className="media-title">{normalizedItem.title}</h1>
      <hr className="line" />
      <p><strong>Genres:</strong> {details.genres?.map(g => g.name).join(", ")}</p>
      <p><strong>Overview:</strong> {details.overview}</p>
      <p><strong>Release:</strong> {normalizedItem.release_date}</p>
      <p><strong>Language:</strong> {normalizedItem.original_language?.toUpperCase()}</p>
      <p><strong>Popularity:</strong> {normalizedItem.popularity}</p>

      {isInWatchLater ? (
        <button
          className="wishlist-btn"
          onClick={() => removeFromWatchLater(normalizedItem)}
        >
          ✖ Remove from Wishlist
        </button>
      ) : (
        <button
          className="wishlist-btn"
          onClick={() => addToWatchLater(normalizedItem)}
        >
          ⭐ Add to Wishlist
        </button>
      )}

      {trailerKey ? (
        <iframe
          className="trailer"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={normalizedItem.title}
          allowFullScreen
        ></iframe>
      ) : (
        <p>No Trailer Available 😢</p>
      )}
    </div>
  );
};

export default MediaDetails;
