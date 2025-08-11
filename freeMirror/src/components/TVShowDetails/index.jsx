import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import { PaginationContext, } from '../../context/PaginationContextProvider';

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



const TVShowDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();
  const {watchLater, addToWatchLater, removeFromWatchLater} = useContext(PaginationContext)
  
  useEffect(()=>{
    const fetchmovieDet = async () => {
        const responseDet = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=9139705d9f63345831e93b1b5450a0da`)
        const responseTra = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=9139705d9f63345831e93b1b5450a0da`)
        const dataDet = await responseDet.json()
        const dataTra = await responseTra.json()
        setDetails(dataDet)
        const trailer = dataTra.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
    }
    fetchmovieDet()
  },[id])
  if(details==null){
    return;
  }
  const isPresentAtWatchLater = watchLater.some((i)=>i.id==details.id)
  console.log(details)
  if (!details) return <p className="tvdetails-loading">Loading...</p>;

  return (
    <div className="tvdetails-container">
      <button onClick={() => navigate(-1)} className="tvdetails-back">← Back</button>
      <h1 className="tvdetails-title">{details.name}</h1>
      <hr className='line' />
      <p><strong>Genres:</strong> {details.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Overview:</strong> {details.overview}</p>
      <p><strong>First Air Date:</strong> {details.first_air_date}</p>
      {!isPresentAtWatchLater ? <button onClick={()=>addToWatchLater(normalizeMediaItem(details,'tv'))} className='wishlist' >⭐Add TO WishList</button>  : <button onClick={()=>removeFromWatchLater(normalizeMediaItem(details,'tv'))} className='wishlist' > ✖️ Remove From WishList</button>}
      
      {trailerKey ? (
        <iframe
          className="tvdetails-trailer"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={details.name}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available 😢</p>
      )}
    </div>
  );
};

export default TVShowDetails;