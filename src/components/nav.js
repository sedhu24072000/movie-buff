import "../index.css";
function Navigation({ children }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>MovieBuff</h1>
      </div>
      {children}
    </nav>
  );
}
export default Navigation;
