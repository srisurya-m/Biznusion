import { FaGlobe, FaHamburger, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
    <nav className="header">
      <Link to={"/"}>
        <img src={logo} className="logo" alt="Biznusion" />
      </Link>
      <div className="options">
      <Link to={"/explore"}>Explore</Link>
      <Link to={"/what-we-do"}>What we do ?</Link>
      <Link to={"/growth-results"}>Growth Results</Link>
      <Link to={"/case-studies"}>Case Studies</Link>
      <Link to={"/career"}>Career</Link>
      <Link to={"/"}>
        <FaGlobe /> English
      </Link>
      <Link to={"/contact"}><button>Contact</button></Link>
      </div>
      <div className="hamburg" onClick={toggleSidebar}>
        <FaHamburger/>
      </div>
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="cross" onClick={toggleSidebar}><FaTimes/></div>
            <Link to={"/explore"}>Explore</Link>
            <Link to={"/what-we-do"}>What we do ?</Link>
            <Link to={"/growth-results"}>Growth Results</Link>
            <Link to={"/case-studies"}>Case Studies</Link>
            <Link to={"/career"}>Career</Link>
            <Link to={"/"}><FaGlobe /> English</Link>
            <Link to={"/contact"}><button>Contact</button></Link>
          </div>
        </div>
      )}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Header;
