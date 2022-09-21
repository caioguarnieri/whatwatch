import { useEffect, useState } from "react"
import {useSearchParams} from "react-router-dom"

import MovieCard from "../components/MovieCard"

const searchUrl = "https://api.themoviedb.org/3/search/movie/";
const apiKey = "f631a8de986ab2ed425533521c2003a2";


const Search = () => {
    const [searchParams] = useSearchParams()

    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies (data.results);
    };

    useEffect(() => {
        const searchWithQueryURL = `${searchUrl}?api_key=${apiKey}&query=${query}`;

        getSearchedMovies(searchWithQueryURL);
    }, [query]);

  return (
    <div className="container">
        <h2 className="title"> 
        Results for: <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
            {movies.length === 0 && <p>Loading...</p>}
            {movies.length > 0 &&
            movies.map((movie) => <MovieCard key = {movie.id} movie ={movie}/>)}
        </div>
    </div>
  )
}

export default Search