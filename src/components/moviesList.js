import "../index.css";
function MoviesList({ temproryMovieData, setSelected }) {
  const getDatas = temproryMovieData;

  return (
    <ul className="list list-movies">
      {getDatas
        ? getDatas.map((e) => (
            <li onClick={() => setSelected(e.imdbID)} key={e.imdbID}>
              <img src={e.Poster} alt={`${e.Title} poster`}></img>
              <h3>{e.Title}</h3>
              <div>
                <p>
                  <span>📅</span>
                  <span>{e.Year}</span>
                </p>
              </div>
            </li>
          ))
        : ""}
    </ul>
  );
}

export default MoviesList;
