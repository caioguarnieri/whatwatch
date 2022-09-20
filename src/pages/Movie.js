import "../components/Movie.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieLength, movieDirector } from "../components/MovieFunction";
/*
const genres = [{
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Sci-Fi",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
]

const tagsEl = document.getElementById('tags');
let selectedGenre =[];

setGenre();

function setGenre() {
tagsEl.innerHTML= '';
genres.forEach(genres => {
const t = document.createElement('div');
t.classList.add('tag');
t.id= genres.id;
t.innerText = genres.name;
t.addEventListener('click',() => {
if(selectedGenre.length == 0){
  selectedGenre.push(genres.id);
}else {
  if(selectedGenre.includes(genres.id)){
    selectedGenre.forEach((id, idx) => {
      if (id == genres.id){
        selectedGenre.splice(idx, 1);
      }
    })
  }else {
    selectedGenre.push(genres.id);
  }
}
})
tagsEl.append(t);
})
console.log(selectedGenre)
Movie('https://api.themoviedb.org/3/movie/${random}?api_key=${APIKey}&language=en-US' + '&with_genres='+encodeURI (selectedGenre.join(',')))
}*/



const Movie = () => {
  const [movie, setMovie] = useState({});
  const [crew, setCrew] = useState({});
  const [showMovie, setShowMovie] = useState(false);
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
          adulto: res.data.adulto, // tentando captar a informacao adulto para verificar depois
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

  }, [params, setMovie]);

  return (
    
 
    <div><div className="flex-container">
        <div className="moviedata">
          <div className="poster">
            <div className="movieposter">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`} alt="poster" className="poster" />
            </div>
          </div>

          <div className="content">

            <h1 className="movietitle">{movie.name}</h1><br />

            <div className="moviedetails">
              <h3>Release Date<br /> {movie.release}</h3>
              <h2> Rating <br /> {movie.rating} <h3 className="star">.</h3> </h2>
              <h3>{movie.genres}</h3>
              <h3>Lenght <br /> {movie.length}</h3>
            </div>

            <p className="moviedescription"> <br /> {movie.description}</p>

            <Link to="/Movie">
              <button className="nextmoviebtn">NEXT MOVIE</button>
            </Link>

          </div>
        </div>
      </div>
      </div>
      
  )
};

export default Movie;
