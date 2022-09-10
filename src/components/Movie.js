import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {movieLenght, moiveDirector} from "./MovieFunction";

const Movie = () => {
    const [overviewTrailer, setOverviewTrailer] = useState (true);
    const [active, setActive] = useState ("active");
    const [active2, setActive2] = useState ("");
    const [movie, setMovie] = useState({});
    const [crew, setCrew] = useState({});
    const [showMovie,setShowMovie] = useState (false);

    const params = useParams();

    const setOverview = () => {
        setOverviewTrailer(false);
        setActive2("active");
        setActive("");
    };

    const setTrailer = () => {
        setOverviewTrailer (false);
        setActive2 ("active");
        setActive ("");
    };

    useEffect(() => {
        const APIKey = "f631a8de986ab2ed425533521c2003a2";
        axios
        .get(
            `https://api.themoviedb.org/3/${params.movieId}?api_Key=${APIKey}&language=en-US`
        )
        .then((res) => {
            setMovie({
            name: res.data.title,
            rating: res.data.vote_average,
            release: res.data.release_date,
            poster: res.data.poster_path,
            length: movieLenght(res.data.runtime),
            description: res.data.overview,
            genres: res.data.genre
        })
        return axios.get(`https://api.themoviedb.org/3/${params.movieId}?api_Key=${APIKey}&language=en-US`)
    }).then(res => {
        let cast =res.data.cast.slice (0, 3);
        cast = cast.map ((item) => {return item.name})
        letdirector = moiveDirector(res.data.crew);
        if(director === undefined) director = {name: 'Unknown'}
        setCrew({cast: cast.join (', '), director: director})
        return axios.get(`https://api.themoviedb.org/3/${params.movieId}?api_Key=${APIKey}`)
    }).then(res => {
        let trailerMovie = res.data.resulsts;
        trailerMovie = trailerMovie.find((item) => {
            return item.type === "Trailer";
        });
        if (trailerMovie) {
            setTrailerUrl(trailerMovie.key);
        }
        setShowMovie(true)
    });
}, [params, setMovie]);

return (
    <div className="movie-container">
      <Navbar />
      {showMovie ? (
        <div className="movie-wrapper">
          <div className="movie-image">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`} alt="Movie poster" />
          </div>
          <div className="movie-info">
            <div className="movie-title-rating">
              <div className="movie-title">
                <h1>{movie.name}</h1>
              </div>
              <div className="rating">
                <h2>{movie.rating}</h2>
                <div className="clip-star"></div>
              </div>
            </div>
            <div className="movie-release-length">
              <h1>{movie.release.substring(0, 4)}</h1>
              <h1>{movie.length}</h1>
            </div>
            <div className="overview-trailer">
              <h1 onClick={setOverview} className={active}>
                OVERVIEW
              </h1>
              <h1 onClick={setTrailer} className={active2}>
                TRAILER
              </h1>
            </div>
            {overviewTrailer ? (
              <>
                <div className="movie-description">
                  <h1>
                    {movie.description}
                  </h1>
                </div>
                <div>
                  <div className="movie-starring">
                    <h1>Starring</h1>
                    <h2>{crew.cast}</h2>
                  </div>
                  <div className="movie-starring">
                    <h1>Created by</h1>
                    <h2>{crew.director.name}</h2>
                  </div>
                  <div className="movie-starring">
                    <h1>Genre</h1>
                    <div className="genres">
                      {movie.genres.map((item) => {
                        return <h2 key={item.id}>{item.name}</h2>
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="movie-trailer">
                <iframe
                  width="560"
                  height="300"
                  src={`https://www.youtube.com/embed/${trailerUrl}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Movie