import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.png";
import "./Navbar.css";
import { useState } from "react";

import {BiSearchAlt2} from "react-icons/bi"

const Navbar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!search) return
    setSearch("");
    navigate(`/search?q=${search}`)
    
  }

  return (
    <nav id="navbar">
      <Link to="/">
        <img src={Logo} className="logo" alt="logo" />
      </Link>
      
      <div className="searchBar">
       <form onSubmit={handleSubmit}>
          <input className="search"
               type='text'
               placeholder="Search a movie" 
               onChange={(e) => setSearch(e.target.value)}
               value={search}/>
        <button type = "submit">
          <BiSearchAlt2 />
        </button>
      </form>
      </div>
    </nav>
  );
};

export default Navbar;
