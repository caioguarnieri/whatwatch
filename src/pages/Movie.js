import "../components/Movie.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieLength } from "../components/MovieFunction";
import noImage from "../Images/No_Image.png";

function checkedToArrayNames(name) {
  return [...document.getElementsByName(name + "[]")]
    .filter((e) => e.checked)
    .map((e) => e.value);
}
const Movie = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const fetchRandomMovie = () => {
    const APIKey = "f631a8de986ab2ed425533521c2003a2";
    const random = Math.floor(Math.random() * 100000);
    const genreFilter = checkedToArrayNames("items");

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=${genreFilter}`
      )
      .then((res) => {
        let totalMovies = res.data.total_pages;
        let totalPages = totalMovies > 500 ? 500 : totalMovies;
        let checkPagesNumber = Math.floor(Math.random() * totalPages);

        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=${genreFilter}&page=${checkPagesNumber}`
          )
          .then((res) => {
            let totalMovie = res.data.results.length;
            let resTest = Math.floor(Math.random() * totalMovie);
            let correctMovie = res.data.results[resTest].id;

            axios

              .get(
                `https://api.themoviedb.org/3/movie/${correctMovie}?api_key=${APIKey}&language=en-US`
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
              })

              .catch((error) => {
                if (error.response.status === 404) {
                  fetchRandomMovie();
                }
                console.log(error);
              });
          });
      });

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=12`
      )
      .then((res) => {
        let totalMovie = res.data.results.length;
        res = Math.floor(Math.random() * totalMovie);
        setMovie({
          name: res.data.title,
          rating: res.data.vote_average,
          release: res.data.release_date,
          poster: res.data.poster_path,
          length: movieLength(res.data.runtime),
          description: res.data.overview,
          genres: genreFilter,
          adult: res.data.adult,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          fetchRandomMovie();
        }
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  useEffect(() => {
    const isAdultFilm = movie.adult;
    if (isAdultFilm) fetchRandomMovie();
  }, [movie]);

  return movie.adult ? (
    <div> Loading... </div>
  ) : (
    <>
      <div id="checkbox">
        <div className="box">
          <label>Action</label>
          <input type="checkbox" name="items[]" value="28" />
        </div>
        <div className="box">
          {" "}
          <label>Adventure</label>
          <input type="checkbox" name="items[]" value="12" />
        </div>
        <div className="box">
          {" "}
          <label>Animation</label>
          <input type="checkbox" name="items[]" value="16" />
        </div>
        <div className="box">
          {" "}
          <label>Crime</label>
          <input type="checkbox" name="items[]" value="80" />
        </div>
        <div className="box">
          {" "}
          <label>Documentary</label>
          <input type="checkbox" name="items[]" value="99" />
        </div>
        <div className="box">
          {" "}
          <label>Family</label>
          <input type="checkbox" name="items[]" value="10751" />
        </div>
        <div className="box">
          {" "}
          <label>Fantasy</label>
          <input type="checkbox" name="items[]" value="14" />
        </div>
        <div className="box">
          {" "}
          <label>History</label>
          <input type="checkbox" name="items[]" value="36" />
        </div>
        <div className="box">
          {" "}
          <label>Horror</label>
          <input type="checkbox" name="items[]" value="27" />
        </div>
        <div className="box">
          {" "}
          <label>Music</label>
          <input type="checkbox" name="items[]" value="10402" />
        </div>
        <div className="box">
          {" "}
          <label>Mystery</label>
          <input type="checkbox" name="items[]" value="9648" />
        </div>
        <div className="box">
          {" "}
          <label>Romance</label>
          <input type="checkbox" name="items[]" value="10749" />
        </div>
        <div className="box">
          {" "}
          <label>Sci-Fi</label>
          <input type="checkbox" name="items[]" value="878" />
        </div>
        <div className="box">
          {" "}
          <label>Thriller</label>
          <input type="checkbox" name="items[]" value="53" />
        </div>
        <div className="box">
          {" "}
          <label>War</label>
          <input type="checkbox" name="items[]" value="10752" />
        </div>
        <div className="box">
          {" "}
          <label>Western</label>
          <input type="checkbox" name="items[]" value="37" />
        </div>
      </div>

      <div className="flex-container">
        <div className="posterdiv">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
            alt="poster"
          />
        </div>

        <div className="content">
          <h1 className="movietitle">{movie.name}</h1>

          <div className="moviedetails">
            <h3>
              Release Date <br /> {movie.release}
            </h3>
            <h3>
              {" "}
              Rating <br /> {movie.rating} <h3 className="star">.</h3>{" "}
            </h3>
            <h3>
              Lenght <br /> {movie.length}
            </h3>
          </div>

          <p className="moviedescription">
            {" "}
            <br /> {movie.description}
          </p>

          <button onClick={fetchRandomMovie} className="nextmoviebtn">
            NEXT MOVIE
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;
