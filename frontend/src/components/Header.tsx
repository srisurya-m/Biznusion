import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import { userNotExist } from "../redux/reducers/userReducer";
import { userReducerInitialState } from "../types/reducerTypes";

const Header = () => {
  const dispatch = useDispatch();
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
      dispatch(userNotExist());
      toast.success("Logged Out Successfully!");
      navigate("/login");
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
        {/* <Link to={"/growth-results"}>Growth Results</Link> */}
        <Link to={"/case-studies"}>Case Studies</Link>
        <Link to={"/career"}>Career</Link>
        <Link to={"/contact"}>
          <button>Contact</button>
        </Link>
      </div>
      <div className="big-screen-profile-icon" onClick={toggleSidebar}>
        {user ? (
          <img src={user.photo} alt="Profile" style={{ marginTop: "8.5px" }} />
        ) : (
          <FiLogIn
            onClick={handleLoginClick}
            style={{
              width: "30px",
              height: "50px",
              color: "white",
              marginTop: "6.5px",
            }}
          />
        )}
      </div>
      <div className="hamburg" onClick={toggleSidebar}>
        <FaBars size="1.8em" />
      </div>
      {isSidebarOpen && (
        <div className="sidebar" style={{ transform: "translateX(0)" }}>
          <div className="sidebar-content">
            <div className="cross" onClick={toggleSidebar}>
              <FaTimes />
            </div>
            <div className="profile-icon" onClick={toggleSidebar}>
        {user ? (
          <img src={user.photo} alt="Profile" style={{ marginTop: "8.5px" }} />
        ) : (
          <FiLogIn
            onClick={handleLoginClick}
            style={{
              width: "30px",
              height: "50px",
              color: "black",
              marginTop: "6.5px",
            }}
          />
        )}
      </div>
            {user ? (
              <Link to={`/my-profile/${user._id}`} onClick={closeSidebar}>
                My Profile
              </Link>
            ) : (
              <></>
            )}
            <Link to={"/explore"} onClick={closeSidebar}>
              Explore
            </Link>
            <Link to={"/what-we-do"} onClick={closeSidebar}>
              What we do ?
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
            {user ? (
              <Link to={""}>
                <button
                  disabled={!user}
                  onClick={logOutHandler}
                  className="logout"
                >
                  Log Out
                </button>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Header;
