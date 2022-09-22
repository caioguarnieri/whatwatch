import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'

import MovieCard from "../components/MovieCard"

import "../components/Details.css";

const moviesURL = "https://api.themoviedb.org/3/movie/"
const apiKey = "f631a8de986ab2ed425533521c2003a2"


const Details = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    console.log(id);

    const getMovie = async(url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie (data);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US",{
            style: "currency",
            currency: "USD"
        })
    }


    useEffect(() => {
        const movieURL = `${moviesURL}${id}?api_key=${apiKey}`;
        getMovie(movieURL)
    },[id]);

  return (
    <div className="movie-page">
        {movie && <>
         <MovieCard movie={movie} showLink={false} />
            <p className="tagline"> {movie.tagline}
            
            <div className="info">
                <h3>
                    <BsWallet2 /> Budget: {formatCurrency(movie.budget)}   <BsGraphUp /> Revenue: {formatCurrency(movie.revenue)}
                </h3>
                <p></p>

            </div>

            <div className="info2">
                <h3>
                    <BsHourglassSplit /> Duration: {movie.runtime} Minutes  -  Release date: {movie.release_date}
                </h3>
                
                
            </div>

            <div className="info3">
                <h3>
                    <BsFillFileEarmarkTextFill /> Descritption
                </h3>
                <p>{movie.overview}</p>
                
            </div></p>

        </>}
            <button onClick={() =>{navigate(-1)}}>Back</button>
    </div>
  )
}

export default Details