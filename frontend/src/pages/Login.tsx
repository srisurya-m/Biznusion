import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosFingerPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const loginWithGoogleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/new`,
        {
          username: user.displayName!,
          photo: user.photoURL!,
          email: user.email!,
          role: "user",
          _id: user.uid,
        }
      );

      if (response.data) {
        toast.success(response.data.message);
        if (!response.data.user.registrationChallenge) {
          navigate(`/${user.uid}`);
        }
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("SignIn failed");
      console.log(error);
    }
  };

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/new`,
        {
          username,
          photo:
            "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
          email,
        }
      );

      if (response.data) {
        toast.success(response.data.message);
        setUsername("");
        setEmail("");
        const userData = response.data.user;
        dispatch(userExist(userData)); // Update user state
        localStorage.setItem("user", JSON.stringify(userData));
        if (!response.data.user.registrationChallenge) {
          navigate(`/${response.data.user._id}`);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("SignIn failed");
      console.log(error);
    }
  };

  const loginWithFingerHandler = async () => {
    navigate("/fingerprint");
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label> Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="div-buttons">
          <button onClick={loginHandler}>
            <FaUserAlt />
            <span>Login</span>
          </button>
        </div>
        <div className="div-buttons">
          <p>Or Continue with</p>
          <button onClick={loginWithGoogleHandler}>
            <FcGoogle />
            <span>Sign In with Google</span>
          </button>
          <button onClick={loginWithFingerHandler}>
            <IoIosFingerPrint />
            <span>Login with fingerprint</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
