import React, { useState, useEffect } from "react";
import Navigation from "./components/nav";
import Main from "./components/main";
import MovieList from "./components/moviesList";
import WatchedMovies from "./components/watchedMovies";
import Length from "./components/length";
import Search from "./components/search";
import Box from "./components/box";
import Summary from "./components/summary";
import Loader from "./components/loader";
import HandleError from "./components/handleError";
import MovieDetails from "./components/movieDetails";

import "./index";
import { useLocalStorage } from "./components/useLocalStorage";

const KEY = "71d6d0bc";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovie, setWatchedMovie] = useLocalStorage([],'watched')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const isAdded = watchedMovie.map((i) => i.imdbID).includes(selectedId);
  const handleSelect = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const closeHandle = () => {
    setSelectedId(null);
  };
  const onGetData = (e) => {
    const alreadyPresent = watchedMovie.map((i) => i.imdbID).includes(e.imdbID);
    if (!alreadyPresent) {
      setWatchedMovie((watchedData) => [...watchedData, e]);
      closeHandle();
    }
  };

  const deleteHandle = (e) => {
    let dummy = [];
    dummy = watchedMovie.filter((i) => i.imdbID !== e);
    setWatchedMovie(dummy);
  };

  useEffect(
    function () {
      const controller = new AbortController()
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,{
              signal: controller.signal
            }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fething movies");
          }
          const data = await res.json();

          if (query.length <= 2) {
            setError("");
            setMovies([]);
            return;
          }
          if (data.Response === "False") {
            throw new Error("Movies not found");
          }
          setMovies(data.Search);
          setError('')
        } catch (err) {
          if(err.name !== 'AbortError'){
            setError(err.message);
          } 
        } finally {
          setIsLoading(false);
        }
      }

      closeHandle()
      fetchMovies();

      return function(){
        controller.abort();
      }
      
    },
    [query]
  );


  return (
    <div>
      <Navigation>
        <Search query={query} setQuery={setQuery}></Search>
        <Length temproryMovieData={movies}></Length>
      </Navigation>
      <Main>
        <Box>
          {/* {isLoading ? (
            <Loader />
          ) : (
            <MovieList temproryMovieData={movies}></MovieList>
          )} */}
          {isLoading && <Loader></Loader>}
          {!isLoading && !error && (
            <MovieList temproryMovieData={movies} setSelected={handleSelect}>
              {" "}
            </MovieList>
          )}
          {error && <HandleError message={error}></HandleError>}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selected={selectedId}
              onCloseMovie={closeHandle}
              onAddMovie={onGetData}
              isAdded={isAdded}
            ></MovieDetails>
          ) : (
            <>
              <Summary temproryWatchedData={watchedMovie}></Summary>
              <WatchedMovies
                temproryWatchedData={watchedMovie}
                setDelete={deleteHandle}
              ></WatchedMovies>
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
