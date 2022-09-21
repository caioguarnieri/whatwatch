import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'

import MovieCard from "../components/MovieCard"

const moviesURL = "https://api.themoviedb.org/3/movie/"
const apiKey = "f631a8de986ab2ed425533521c2003a2"


const Details = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null)

    const getMovie = async(url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie (data);
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?api_key=${apiKey}`;
        getMovie(movieURL)
    },[]);

  return (
    <div>
        {movie && <>{movie.title}</>}

    </div>
  )
}

export default Details