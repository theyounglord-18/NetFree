import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function customComAsc(a,b){
  if(a.popularity>b.popularity){
    return -1
  }
  else{
    return 1
  }
}

function customComDes(a,b){
  if(a.popularity>b.popularity){
    return 1
  }
  else{
    return -1
  }
}

const TVShowList = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const tvRes = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=9139705d9f63345831e93b1b5450a0da");
      const genreRes = await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=9139705d9f63345831e93b1b5450a0da");
      const tvData = await tvRes.json();
      const genreData = await genreRes.json();
      setShows(tvData.results);
      setGenres(genreData.genres);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredShows(shows);
    } else {
      const filtered = shows.filter(show =>
        show.genre_ids.some(id => {
          const matchedGenre = genres.find(g => g.id === id);
          return matchedGenre?.name === selectedGenre;
        })
      );
      setFilteredShows(filtered);
    }
  }, [selectedGenre, shows, genres]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const decORD = () => {
    const filter = [...filteredShows].sort(customComAsc)
    setFilteredShows(filter)
  }

  const incORD = () => {
    const filter = [...filteredShows].sort(customComDes)
    setFilteredShows(filter)
  }


  return (
    <div className="tvlist-container">
      <div className='header'>
        <h1 className="tvlist-title">Popular TV Shows</h1>

        <div className='fil'>
          <div className='popular'>
            <p>Popularity</p>
            <button onClick={decORD}>🔝</button>
            <button onClick={incORD}>🔻</button>
          </div>

          <div className='genrefilter'>
            <p className='genreName'>Genre:</p>
            <select onChange={handleGenreChange} className='drop'>
              <option value="All">All</option>
              {genres.map((g) => (
                <option key={g.id} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="tvlist-grid">
        {filteredShows.length>0?filteredShows.map(show => (
          <div key={show.id} className="tvlist-card" onClick={() => navigate(`/tv/${show.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
              alt={show.name}
              className="tvlist-poster"
            />
            <p className="tvlist-name">{show.name}</p>
          </div>
        )): <h1>OOPS No Movies Found !!!</h1>}
      </div>
    </div>
  );
};

export default TVShowList;
