import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";


import "../components/Details.css";

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "f631a8de986ab2ed425533521c2003a2";
const imageUrl = "https://image.tmdb.org/t/p/w500/";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  console.log(id);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?api_key=${apiKey}`;
    getMovie(movieURL);
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <img src={imageUrl + movie.poster_path} alt={movie.name} />

          <div className="movieInfo">
            <button
              className="backbtn"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
            <h2> {movie.original_title} </h2>
            <p>
              {" "}
              <br />
              <h3 className="star">.</h3> {movie.vote_average}
            </p>
            <br />
            <br />
            <p className="tagline"> " {movie.tagline} "</p>

            <div className="info">
              <h3>
                <span>
                  <BsWallet2 />
                  Budget: {formatCurrency(movie.budget)}
                </span>
                <span>
                  <BsGraphUp />
                  Revenue: {formatCurrency(movie.revenue)}
                </span>
              </h3>
              <br />
            </div>

            <div className="info2">
              <h3>
                <BsHourglassSplit /> Duration: {movie.runtime} Minutes <br />
                <br />
                Release date: {movie.release_date}
              </h3>
            </div>
            <br />
            <br />
            <div className="info3">
              <h3>
                <BsFillFileEarmarkTextFill /> Descritption <br />
                <br />
              </h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Details;
