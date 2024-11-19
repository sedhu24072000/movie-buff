function Length(props) {
  const arr = props.temproryMovieData;
  return (
    <p className="num-results">
      Found <strong>{arr ? arr.length : 0}</strong> results
    </p>
  );
}

export default Length;
