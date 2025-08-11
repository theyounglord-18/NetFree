import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Wishlist from './components/WishList.jsx';
import TVShowList from './components/TVShowList/index.jsx';
import TVShowDetails from './components/TVShowDetails/index.jsx';
import SepMovies from './components/SepMovies/index.jsx';
import MediaDetails from './components/MediaDetails.jsx/index.jsx';
import LoginPage from './components/LoginPage/index.jsx';
import ProtectedRoute from './components/ProtectedRoute/index.jsx';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="page">
      {!shouldHideNavbar && <NavBar />}
      <Routes>
        <Route path="/register" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tvshows"
          element={
            <ProtectedRoute>
              <TVShowList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tv/:id"
          element={
            <ProtectedRoute>
              <TVShowDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sepmovies"
          element={
            <ProtectedRoute>
              <SepMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sepmovies/movies/:id"
          element={
            <ProtectedRoute>
              <MediaDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sepmovies/tv/:id"
          element={
            <ProtectedRoute>
              <MediaDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
  