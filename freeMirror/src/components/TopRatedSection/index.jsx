import { useState, useEffect, useContext } from 'react';
import MovieDetails from '../MovieDetails';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { PaginationContext } from '../../context/PaginationContextProvider';

// ✅ Heroicons SVG arrows (you can also import from @heroicons/react if using)
const LeftArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="arrow-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const RightArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="arrow-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

const TopRatedSection = () => {
  const { pageSize, currentPage, setCurrentPage, topRatedMovies } =
    useContext(PaginationContext);
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState([]);

  useEffect(() => {
    if (topRatedMovies && topRatedMovies.length > 0) {
      setTotalPages(Math.ceil(topRatedMovies.length / pageSize));
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      setCurrentPages(topRatedMovies.slice(startIndex, endIndex));
    }
  }, [topRatedMovies, currentPage, pageSize]);

  const gotoMovie = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="topsection">
      <h3 className="headingname">Top Rated Films</h3>
      <div className="topratedsection">
        <button
          className="prevpage"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          <LeftArrow />
        </button>

        <div className="ratedsection">
          {currentPages.map((movie) => (
            <div
              key={movie.id}
              onClick={() => gotoMovie(movie)}
              className="movieCard"
            >
              <img
                className="poster-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movieDetails">
                <p className="titlename">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="nextpage"
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default TopRatedSection;
