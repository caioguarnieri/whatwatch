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
    const APIKey = "f631a8de986ab2ed425533521c2003a2";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/591?api_key=${APIKey}&language=en-US`
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
        return axios.get(
          `https://api.themoviedb.org/3/movie/550?api_key=${APIKey}&language=en-US`
        );
      })
      .then((res) => {
        let cast = res.data.cast;
        cast = cast.map((item) => {
          return item.name;
        });
        let director = movieDirector(res.data.crew);
        if (director === undefined) director = { name: "Unknown" };
        setCrew({ cast: cast.join(", "), director: director });
        return axios.get(
          `https://api.themoviedb.org/3/movie/550?api_key=${APIKey}`
        );
      });
  }, [params, setMovie]);

  return (
    
    
    <div className="flex-container">
     
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}  alt="poster" className="poster" />
      
   
     <div className="content">
      <h1 className="movietitle">{movie.name}</h1><br/>
    <div className="moviedetails">
    <h3>Release Date<br/> {movie.release}</h3>
      <h2> Rating <br/> {movie.rating} <h3 className="star">.</h3> </h2>
      <h3>{movie.genres}</h3>
      <h3>Lenght <br/> {movie.length}</h3>
    </div>

      <p className="moviedescription"> <br/> {movie.description}</p>
    
      <button className="nextmoviebtn">NEXT MOVIE</button>


    </div>
    </div>
  );
};

export default Movie;
