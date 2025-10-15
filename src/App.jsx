// Importing React components that you’ll use inside App.jsx:
// MovieCard → Displays movie info (poster, title, favourite button).
// Favourites → Page that shows all saved favourite movies.
// NavBar → Navigation bar for switching between pages.
// Home → Main page that lists popular movies and supports searching.

import "./css/App.css";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import { Home } from "./pages/Home";

// These are from React Router, a library used for navigation between pages.
// Routes acts as a container for all your routes.
// Route defines a single route (path + component to show).
import { Routes, Route } from "react-router-dom";

// Imports your context provider (MovieProvider).
// It wraps your whole app to share global state (like favourites) across components.
// So now, all children components can use the useMovieContext() hook to access or update favourites.
import { MovieProvider } from "./contexts/MovieContext";
function App() {
  return (
    <>
      {/* <MovieProvider> ... </MovieProvider>

      ➡️ Explanation:

      This wraps your whole app with the Movie Context Provider.
      It means all components inside it (like NavBar, Home, Favourites, MovieCard) can access:
      const { favourites, addToFavourites, removeFromFavourites } = useMovieContext();
      It’s a global state provider for your movie favourites.
      So this acts like a “data bubble” around your app. */}
      <MovieProvider>
        {/* Explanation:

          The navigation bar at the top of every page.
          It stays visible no matter what page you’re on (Home or Favourites).
          Contains links like:
          Home (/)
          Favourites (/favourites)
          So you can switch pages without refreshing (thanks to React Router). */}
        <NavBar></NavBar>
        <main className="main-content">
          {/* ➡️ Explanation:

        Routes acts like a “container” for all available routes in your app.
        Inside it:
        <Route path="/" element={<Home />}></Route>
        When the browser URL is /, React Router renders the <Home /> component.
        This shows your main page with movie listings.
        <Route path="/favourites" element={<Favourites />}></Route>
        When the URL is /favourites, React Router renders the <Favourites /> page.
        This page shows movies saved in favourites (from your context).
        React Router ensures no page reloads — it swaps components dynamically, giving a Single Page Application (SPA) experience. */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
          </Routes>
        </main>
        {/* ➡️ Explanation:

      Ends the provider.
      Everything inside (NavBar, Routes, etc.) has access to the context values.
      If something is outside of this provider, it can’t access useMovieContext(). */}
      </MovieProvider>
    </>
  );
}

export default App;

// Return JSX summary

// The App structure visually looks like this:

{
  /* <MovieProvider>
  ├── NavBar
  └── main
      ├── Route "/"
      │    └── Home
      └── Route "/favourites"
           └── Favourites
</MovieProvider> */
}

// ✅ Summary of What Happens in App.jsx

// | Section                | Description                                |
// | ---------------------- | ------------------------------------------ |
// | `import MovieProvider` | Provides global movie state (favourites)   |
// | `import Routes/Route`  | Handles navigation between pages           |
// | `<MovieProvider>`      | Wraps app with shared context              |
// | `<NavBar>`             | Displays navigation links on all pages     |
// | `<Routes>`             | Defines which component shows at which URL |
// | `Home` route           | Main page showing movies and search bar    |
// | `Favourites` route     | Page showing saved favourite movies        |

// 🧠 App.jsx Flow Diagram (Simple View)

// main.jsx
//    ↓
// <App />
//    ↓
// <MovieProvider>  ← makes favourites available globally
//    ↓
// <NavBar />       ← visible at all times
// <Routes>         ← handles navigation
//    ├── "/" → <Home />        ← shows popular + searched movies
//    └── "/favourites" → <Favourites />  ← shows saved movies
