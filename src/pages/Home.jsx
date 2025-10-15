// Import CSS styling for this page
import "../css/Home.css";

// Import MovieCard component to display each movie
import MovieCard from "../components/MovieCard";

// Import React hooks to manage state and side effects
import { useState, useEffect } from "react";

// Import API helper functions for fetching movies
import { searchMovies, getPopularMovies } from "../services/api";

// Declares a React functional component named Home.
// export lets it be imported in other files (like App.jsx).
export function Home() {
  // 🧠 useState hooks to manage component data

  // Each useState() creates a reactive variable:

  // | State Name    | Type          | Purpose                                   |
  // | ------------- | ------------- | ----------------------------------------- |
  // | `searchQuery` | string        | What user types in search box             |
  // | `movies`      | array         | List of movie objects from API            |
  // | `error`       | string / null | To show error message                     |
  // | `loading`     | boolean       | To show “Loading…” while waiting for data |

  // Store the text typed in the search box
  const [searchQuery, setSearchQuery] = useState("");

  // Store the list of movies (either popular or searched)
  const [movies, setMovies] = useState([]);

  // Store error message if API call fails
  const [error, setError] = useState(null);

  // Show loading state (true when fetching data)
  const [loading, setLoading] = useState(true);

  // useEffect() runs once after the component first loads ([] dependency = only on mount).
  // Inside it:
  // loadPopularMovies() calls the getPopularMovies() API from TMDB.
  // If success → saves the movie list into movies state.
  // If error → shows message “Failed to load movies…”.
  // finally → stops loading animation.
  // This ensures the Home page automatically shows popular movies on first visit.

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        // Call the API to get popular movies
        const popularMovies = await getPopularMovies();

        // Store the movies in state
        setMovies(popularMovies);
      } catch (err) {
        // Log the error in console (for debugging)
        console.log(err);

        // Set user-friendly error message
        setError("Failed to load movies...");
      } finally {
        // Whether success or fail, stop loading indicator
        setLoading(false);
      }
    };

    // Call the async function once when page loads
    loadPopularMovies();
  }, []);

  // 'handleSearch' runs when user submits the search form.
  // It prevents page reload, checks if query is valid, then calls TMDB’s search API.
  // Updates the UI by:
  // Replacing movie list (setMovies),
  // Resetting any error,
  // And showing/hiding loading text properly.

  const handleSearch = async (e) => {
    e.preventDefault(); // prevent form from reloading page

    // If search box is empty, do nothing
    if (!searchQuery.trim()) return;

    // If already loading, prevent multiple API calls
    if (loading) return;

    // Show loading animation
    setLoading(true);

    try {
      // Call API to search movies based on query
      const searchResults = await searchMovies(searchQuery);

      // Replace current movie list with search results
      setMovies(searchResults);

      // Clear any previous error
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search Movies...");
    } finally {
      setLoading(false);
    }
  };

  // Return JSX (the HTML-like structure React renders).
  // Wrap everything in a <div> with class "home" for CSS styling.
  return (
    <div className="home">
      {/* This is the search bar:
      The <form> calls handleSearch when submitted.
      The <input> is controlled — its value comes from searchQuery state.
      onChange updates the state every time user types.
      The <button> triggers the search when clicked or when pressing Enter. */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* Conditional rendering:
        If error has a value (not null), display it inside a <div>.
        Otherwise, show nothing. */}
      {error && <div className="error-message">{error}</div>}

      {/* This block decides what to display:

      If loading is true:
      → Show "Loading..." text.

      If loading is false:
      → Show a grid of movies.

      Inside the grid:

      movies.map(...) loops through each movie in the movies array.
      The condition .includes(searchQuery.toLowerCase()) filters the movies again locally (so typing still refines results even after an API call).
      For each movie that matches, it renders:

      <MovieCard movie={movie} key={movie.id} />

      where movie is passed as a prop.

      key={movie.id} helps React efficiently track which movie card belongs to which data item. */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}
    </div>
  );
}

// ✅ Summary of Home.jsx

// | Section          | Purpose                                                    |
// | ---------------- | ---------------------------------------------------------- |
// | `useState()`     | Manage search input, movie list, loading, and errors       |
// | `useEffect()`    | Automatically load popular movies on page load             |
// | `handleSearch()` | Fetch movie results when user searches                     |
// | JSX return       | Render search form, loading/error messages, and movie grid |

// 🧠 Data Flow Overview

// When the Home page opens → useEffect runs → calls getPopularMovies() → movies appear.
// User types something → updates searchQuery.
// When user submits → handleSearch() runs → calls searchMovies() → replaces movies.
// User sees updated movie cards → each one rendered with <MovieCard />.
