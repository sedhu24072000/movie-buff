import "../index.css";

function WatchedMovies({ temproryWatchedData, setDelete }) {
  const watchedData = temproryWatchedData;
  const handleDelete = (e) => {
    setDelete(e);
  };

  return (
    <ul className="list">
      {watchedData.map((e) => (
        <li key={e.imdbID}>
          <img src={e.poster} alt={`${e.title} poster`}></img>
          <h3>{e.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{e.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{e.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{e.runtime}</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(e.imdbID)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMovies;
