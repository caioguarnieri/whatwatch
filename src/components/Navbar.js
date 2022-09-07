import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Home</h1>
      </Link>
    </div>
  );
};

export default Navbar;
