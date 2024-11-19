import {useState, useEffect} from 'react'

export function useLocalStorage(initialState,key){

    const [watchedMovie, setWatchedMovie] = useState(function(){
        const watch = JSON.parse(localStorage.getItem(key))
        return watch ? watch : initialState
       });

    useEffect(function(){
        localStorage.setItem(key,JSON.stringify(watchedMovie))
      },[watchedMovie,key])
    
      return [watchedMovie,setWatchedMovie]
}