import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const SepMovies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("en-IN");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=9139705d9f63345831e93b1b5450a0da&language=${language}&region=IN&sort_by=${sortBy}&page=${pageNumber}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
    };
    fetchMovies();
  }, [pageNumber, language, sortBy]);

  const handleFilterChange = (type, value) => {
    if (type === "sort") setSortBy(value);
    if (type === "language") setLanguage(value);
  };

  const gotoThatMovie= (id) =>{
    navigate(`/sepmovies/movies/${id}`)
  }

  return (
    <div className="sep-movies-wrapper">
      <div className="self-nav">
        <h1 className="header">Popular Movies</h1>
      <div className="filter-panel-top">
        <div>
          <label>Sort By: </label>
          <select onChange={(e) => handleFilterChange("sort", e.target.value)}>
            <option value="original_title.asc">A-Z</option>
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Latest</option>
          </select>
        </div>
        <div>
          <label>Language: </label>
          <select
            onChange={(e) => handleFilterChange("language", e.target.value)}
            value={language}
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="te-IN">Telugu</option>
            <option value="ta-IN">Tamil</option>
            <option value="ml-IN">Malayalam</option>
          </select>
        </div>
      </div>
      </div>

      {/* MOVIE GRID */}
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} onClick={()=>gotoThatMovie(movie.id)} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p className="movie-title">{movie.title}</p>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}>
          ⬅ Prev
        </button>
        <span>Page {pageNumber}</span>
        <button onClick={() => setPageNumber((prev) => prev + 1)}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default SepMovies;
