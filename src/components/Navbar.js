import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import "./Navbar.css";

const Navbar = () => {

  return (
    <div className="navbar">
      <Link to="/">
        <img src={Logo} className="logo" alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
