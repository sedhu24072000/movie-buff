import React, { useState, useEffect } from "react";
import "../index.css";
import Star from "../staromponent/star";
import Loader from "./loader";

const KEY = "71d6d0bc";
function MovieDetails({ selected, onCloseMovie, isAdded, onAddMovie }) {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movies;

  const getuserRating = (e) => {
    setUserRating(e);
  };
  useEffect(
    function () {
      async function handleMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${KEY}&i=${selected}`
        );

        const data = await res.json();
        setMovies(data);
        setIsLoading(false);
      }
      handleMovieDetails();
    },
    [selected]
  );


  const handleClickEvent = () => {
    const movieObj = {
      imdbID: selected,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating)
      // count:myRef.current
    };
    onAddMovie(movieObj);
  };



  // const myRef = useRef(0)
  // useEffect(function(){
  //   if(userRating){
  //     myRef.current = myRef.current + 1
  //   }
    
  // },[userRating])


  useEffect(function () {
    if(!title) return 
    document.title = `Movie Buff | ${title}`

    return function(){
      document.title = 'Movie Buff'
    }
  }
  ,[title])

  useEffect(function (){
    function callback(e){
      if(e.code === 'Escape'){
        onCloseMovie()
      }
    }
    document.addEventListener('keydown',callback)

    return function(){
      document.removeEventListener('keydown',callback)
    }
  },[onCloseMovie])


  return (
    <div className="details">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isAdded ? (
                <>
                  <Star
                    maxRating={10}
                    size={24}
                    color="yellow"
                    ongetRating={getuserRating}
                  ></Star>
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleClickEvent}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have already rated this movie. </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
