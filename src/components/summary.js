function Summary(props) {
  const watchedData = props.temproryWatchedData;
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedData.length}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>
            {(
              watchedData.reduce((acc, e) => acc + e.imdbRating, 0) / 2
            ).toFixed(2)}
          </span>
        </p>
        <p>
          <span>🌟</span>
          <span>
            {(
              watchedData.reduce((acc, e) => acc + e.userRating, 0) / 2
            ).toFixed(2)}
          </span>
        </p>
        <p>
          <span>⏳</span>
          <span>
            {(watchedData.reduce((acc, e) => acc + e.runtime, 0) / 2).toFixed(
              2
            )}{" "}
            min
          </span>
        </p>
      </div>
    </div>
  );
}

export default Summary;
