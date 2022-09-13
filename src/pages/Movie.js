import "../components/Movie.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieLength, movieDirector } from "../components/MovieFunction";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const [crew, setCrew] = useState({});
  const [showMovie, setShowMovie] = useState(false);
  const params = useParams();

  useEffect(() => {
    const APIKey = process.env.REACT_APP_API_KEY;
    const random = Math.floor(Math.random() * 1000);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${random}?api_key=${APIKey}&language=en-US`
      )
      .then((res) => {
        setMovie({
          name: res.data.title,
          rating: res.data.vote_average,
          release: res.data.release_date,
          poster: res.data.poster_path,
          length: movieLength(res.data.runtime),
          description: res.data.overview,
          genres: res.data.genre,
        });
       
      })
      
  }, [params, setMovie]);

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
        alt="Movie poster"
      />
      <h1>{movie.name}</h1>
      <h2>{movie.rating}</h2>
      <h1>{movie.release}</h1>
      <h1>{movie.genres}</h1>
      <h1>{movie.length}</h1>
      <h1>{movie.description}</h1>
      <h1> {movie.director}</h1>
      


    </div>
   
  );
};

export default Movie;
