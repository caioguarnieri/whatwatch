import "../components/home.css"
import { useState } from "react";
import FetchMovie from "../components/FetchMovie";

const Home = () => {
  const [findMovie, setFindMovie] = useState(false);
  return (
    <>
    <div className="body">
      
        <div className="descricao">
        
    
        <h1> Feeling lost and looking for  <br></br> a movie to watch? <br></br>We can Help!</h1> <br/> <br/>
        
        <button onClick={() => setFindMovie(true)} className="givemovie"> GIVE ME A MOVIE ! </button>
        
        </div>
    </div>
    {findMovie ? <FetchMovie setFindMovie={setFindMovie}/> : ''}
    </>
  );
};

export default Home