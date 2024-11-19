import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const myRef = useRef(null)
  useEffect(function(){
    function callBack(e){
      if(document.activeElement === myRef.current) return
      if(e.code === 'Enter') {
        myRef.current.focus()
        setQuery("")
      }
    }
    myRef.current.focus()
    document.addEventListener('keydown',callBack)

    return function(){
      document.removeEventListener('keydown',callBack)
    }
  },[setQuery])
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={myRef}
      />
    </>
  );
}

export default Search;
