import "../index.css";

function HandleError({ message }) {
  return (
    <p className="error">
      <span>😨</span>
      {message}
    </p>
  );
}

export default HandleError;
