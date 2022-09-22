import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Details from "./pages/Details";
//import { Link } from "react-router-dom";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

       <Routes>
       <Route path="/" element = {<Home />}  />
       <Route path="/movie:id" element ={<Movie />} />
       <Route path="/search" element ={<Search />} />
       <Route path="/details/:id" element ={<Details />} />
       
       
      
      </Routes>
      </div>
);
}

export default App;
