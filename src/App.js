import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
//import { Link } from "react-router-dom";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

       <Routes>
       <Route path="/" element = {<Home/>}  />
       <Route path="/Movie" element ={<Movie/>} />
       
      
      </Routes>
      </div>
);
}

export default App;
