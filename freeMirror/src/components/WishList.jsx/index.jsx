import React, { useEffect, useContext } from 'react'
import "./index.css"
import { PaginationContext } from '../../context/PaginationContextProvider'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
  const { watchLater, topRatedMovies } = useContext(PaginationContext)
  const navigate = useNavigate()
  console.log(watchLater)


  const gotoMedia = (item) => {
    console.log(item)
  if (item.media_type === 'tv') {
    navigate(`/tv/${item.id}`);
  } else {
    navigate(`/movie/${item.id}`);
  }
};


  return (
    <div className='watchLater-page'>
      {watchLater.length > 0 ? (
        watchLater.map((movie) => (
          <div key={movie.id} onClick={() => gotoMedia(movie)} className="movieCard">
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movieDetails">
              <p className="titlename">{movie.title}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1>No movies in Wishlist 😔</h1>
        </div>
      )}
    </div>
  )
}

export default Wishlist
