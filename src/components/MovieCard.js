import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const imageUrl = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div >
      
        <img src={imageUrl + movie.poster_path} alt={movie.name} />
        <h2> {movie.original_title} </h2>
        <p>
           <FaStar /> {movie.vote_average}
        </p>
      
      {showLink && <Link to={`/details/${movie.id}`}>Details</Link>}
    </div>
  );
};

export default MovieCard;
