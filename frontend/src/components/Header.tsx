import { useEffect, useState } from "react";
import { FaBars, FaGlobe, FaTimes, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducerTypes";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const Header = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const logOutHandler = async () => {
    try {
      localStorage.removeItem("user");
      await signOut(auth);
      toast.success("Logged Out Successfully!");
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
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
      <div className="profile-icon" onClick={toggleSidebar}>
        {user ? (
          <img src={user.photo} alt="Profile" />
        ) : (
          <FaUserAlt onClick={handleLoginClick} />
        )}
      </div>
      <div className="hamburg" onClick={toggleSidebar}>
        <FaBars size="1.8em" />
      </div>
      {isSidebarOpen && (
        <div className="sidebar" style={{ transform: 'translateX(0)' }}>
          <div className="sidebar-content">
            <div className="cross" onClick={toggleSidebar}>
              <FaTimes />
            </div>
            <Link to={"/explore"} onClick={closeSidebar}>
              Explore
            </Link>
            <Link to={"/what-we-do"} onClick={closeSidebar}>
              What we do ?
            </Link>
            <Link to={"/growth-results"} onClick={closeSidebar}>
              Growth Results
            </Link>
            <Link to={"/case-studies"} onClick={closeSidebar}>
              Case Studies
            </Link>
            <Link to={"/career"} onClick={closeSidebar}>
              Career
            </Link>
            <Link to={"/contact"} onClick={closeSidebar}>
              <button>Contact</button>
            </Link>
            <button disabled={!user} onClick={logOutHandler} className="logout">Log Out</button>
          </div>
        </div>
      )}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Header;
