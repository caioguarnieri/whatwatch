import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const imageUrl = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <div>
        <img src={imageUrl + movie.poster_path} alt={movie.name} />
        <h2>
          {movie.original_title} <FaStar /> {movie.vote_average}{" "}
        </h2>
      </div>
      <div>{showLink && <Link to={`/details/${movie.id}`}>Details</Link>}</div>
    </div>
  );
};

export default MovieCard;
