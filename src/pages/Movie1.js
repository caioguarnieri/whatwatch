import "../components/Movie.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieLength } from "../components/MovieFunction";
import noImage from "../Images/No_Image.png"



const Movie = () => {
  const [movie, setMovie] = useState({});
  
  const params = useParams();

  


  useEffect(() => {
    const APIKey = "f631a8de986ab2ed425533521c2003a2";
    const random = Math.floor(Math.random() * 1000000);
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
          adult: res.data.adult,
        });
        return axios.get(
          `https://api.themoviedb.org/3/movie/${random}?api_key=${APIKey}&language=en-US`
        );
      })

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
      
      <button onClick={fetchRandomMovie} className="nextmoviebtn">NEXT MOVIE</button>
  

    </div>
    </div>
  );
};

export default Movie;
