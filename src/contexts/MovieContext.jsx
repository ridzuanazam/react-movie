/* eslint-disable react-refresh/only-export-components */
// createContext → to create a Context object.

// useState → to manage state (e.g. favourite movies).

// useEffect → to run code when component mounts or updates.

// useContext → to use the context data inside any component.

import { createContext, useState, useEffect, useContext } from "react";

// createContext() creates a new Context object called MovieContext.
// Think of this as a “shared data container” that can hold values (like favourites)
// and make them available to any component in the app.
const MovieContext = createContext();

// This creates a custom hook called useMovieContext.
// Instead of typing useContext(MovieContext) everywhere, we can just call useMovieContext() in any component.
// This makes code cleaner and easier to reuse.
export const useMovieContext = () => useContext(MovieContext);

// Define a React component called MovieProvider.

// It will wrap around your app and provide the movie data (like favourites) to all components inside it.

// { children } means whatever is nested inside this provider (like <App />) will be rendered here.
// Example:

// <MovieProvider>
//   <App />
// </MovieProvider>

// Here, <App /> is the children.
export const MovieProvider = ({ children }) => {
  // Create a state variable to store the list of favourite movies.
  // favourites → current list of favourite movies.

  // setFavourites → function to update that list.

  // It starts as an empty array [].
  const [favourites, setFavourites] = useState([]);

  //   This runs once when the component mounts (because of [] dependency).
  // localStorage.getItem("favourites") retrieves any previously saved favourites from the browser’s storage.
  // If there are saved favourites, we convert the JSON string back into an array using JSON.parse and set it to the state favourites.
  // 🧠 So this makes sure your favourites stay saved even if you refresh the page.
  useEffect(() => {
    const storedFavs = localStorage.getItem("favourites");

    if (storedFavs) setFavourites(JSON.parse(storedFavs));
  }, []);

  //   This runs every time the favourites array changes.
  // It saves the latest favourites array into localStorage as a JSON string.
  // This keeps your favourite movies persistent across browser sessions.
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  //   Function to add a movie to favourites.
  // prev represents the previous list of favourites.
  // [...prev, movie] → copies the old favourites and adds the new one at the end.
  // Then setFavourites() updates the state (and triggers the localStorage saving via the useEffect above).
  const addToFavourites = (movie) => {
    setFavourites((prev) => [...prev, movie]);
  };

  //   Function to remove a movie from favourites.
  // It filters out the movie that matches the given movieId.
  // The new filtered list replaces the old one using setFavourites.
  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  //   Function to check if a movie is already in favourites.
  // .some() returns true if any movie in the array has the same id as movieId.
  // This helps to toggle the “♡” button between active and inactive states.
  const isFavourites = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  //   Bundle all data and functions into one object called value.
  // This is what we will share across the app via the Provider.
  // So other components can access these functions easily.
  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourites,
  };

  // MovieContext.Provider → special component that provides the context data (value) to everything inside it.
  // {children} means render whatever is wrapped inside <MovieProvider> (your entire app).
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );

  // So all components inside <MovieProvider> — like MovieCard and Favourites — can access:
  // const { favourites, addToFavourites, removeFromFavourites, isFavourites } = useMovieContext();
};
