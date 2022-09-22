import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'

import MovieCard from "../components/MovieCard"
import { movieLength } from "../components/MovieFunction"

const moviesURL = "https://api.themoviedb.org/3/movie/"
const apiKey = "f631a8de986ab2ed425533521c2003a2"


const Details = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null)

    console.log(id);

    const getMovie = async(url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie (data);
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?api_key=${apiKey}`;
        getMovie(movieURL)
    },[id]);

  return (
    <div>
        {movie && <>
         <MovieCard movie={movie} showLink={false} />
            <p className="tagline"> {movie.tagline}</p>
            <div className="info">
                <h3>
                    <BsWallet2 /> Budget: {movie.budget}   <BsGraphUp /> Revenue: {movie.revenue}
                </h3>
                <p></p>

            </div>

            <div className="info2">
                <h3>
                    <BsHourglassSplit /> Duration: {movie.runtime} Minutes   Release date: {movie.release_date}
                </h3>
                <p> minutes</p>
                
            </div>

            <div className="info3">
                <h3>
                    <BsFillFileEarmarkTextFill /> Descritption
                </h3>
                <p>{movie.overview}</p>
                
            </div>

        </>}

    </div>
  )
}

export default Details