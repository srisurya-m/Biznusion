import { useEffect, useState } from "react";
import { FaBars, FaGlobe, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className={`header ${visible ? "visible" : ""}`}>
      <Link to={"/"} onClick={closeSidebar}>
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
        <Link to={"/contact"}>
          <button>Contact</button>
        </Link>
      </div>
      <div className="hamburg" onClick={toggleSidebar}>
        <FaBars size="1.8em" />
      </div>
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="cross" onClick={toggleSidebar}>
              <FaTimes />
            </div>
            <Link to={"/explore"} onClick={closeSidebar}>Explore</Link>
            <Link to={"/what-we-do"} onClick={closeSidebar}>What we do ?</Link>
            <Link to={"/growth-results"} onClick={closeSidebar}>Growth Results</Link>
            <Link to={"/case-studies"} onClick={closeSidebar}>Case Studies</Link>
            <Link to={"/career"} onClick={closeSidebar}>Career</Link>
            <Link to={"/"} onClick={closeSidebar}>
              <FaGlobe /> English
            </Link>
            <Link to={"/contact"} onClick={closeSidebar}>
              <button>Contact</button>
            </Link>
          </div>
        </div>
      )}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Header;
